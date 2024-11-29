import { eq } from "drizzle-orm"
import ShareDTO from "~/server/database/dto/ShareDTO"
import { shares } from "~/server/database/schema"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) throw createError({ statusCode: 400 })

    const body = await readBody(event)
    if (!body.password) throw createError({ statusCode: 400 })

    const slug = `/share/${id}`
    const entity = await useDrizzle().query.shares.findFirst({
        where: (shares, { eq }) => (eq(shares.slug, slug))
    })

    if (!entity) throw createError({ status: 404, statusMessage: 'Not Found!' })

    const responseObject = ShareDTO.fromEntity(entity, body.password).getFull();

    if (responseObject.destructable) {
        await useDrizzle().delete(shares).where(eq(shares.id, responseObject.id))
    }

    return responseObject;
})