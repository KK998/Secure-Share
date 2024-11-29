
import crypto from 'crypto'
import { object, string, bool } from 'yup'

import { shares } from '~/server/database/schema'
import { encrypt } from "~/server/utils/crypto"

const schema = object({
    content: string().required('content:form.requiredField'),
    password: string().min(8, 'password:form.minimumLength').required('password:form.requiredField'),
    selfDestruct: bool().default(false).optional()
})

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const result = await schema.validate(body, {

        })

        try {
            const entity = await useDrizzle()
                .insert(shares)
                .values({
                    slug: `/share/${crypto.randomUUID()}`,
                    content: encrypt(result.content, result.password),
                    destructable: result.selfDestruct === true ? 1 : 0,
                    createdAt: (new Date())
                })
                .returning()

            setResponseStatus(event, 201, 'Share created')

            return {
                slug: entity[0].slug
            }
        } catch (error) {
            throw createError({
                message: '',
                data: String(error).split('Error:')[1].trim()
            })
        }
    } catch (error: any) {
        if (error && error?.cause) throw error;

        const validationError = String(error).split('Error:')[1].trim()
        throw createError({
            statusCode: 400,
            message: 'Validation Error',
            data: {
                [validationError.split(':')[0]]: validationError.split(':')[1]
            },
            stack: undefined
        })
    }
})