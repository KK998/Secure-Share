import ShareDTO from "~/server/database/dto/ShareDTO"
import { useDrizzle } from "~/server/utils/drizzle"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    if (!id) throw createError({ statusCode: 400 })

    const slug = `/share/${id}`

    const entity = await useDrizzle().query.shares.findFirst({
        where: (shares, { eq }) => (eq(shares.slug, slug))
    })

    if (!entity) throw createError({ statusCode: 404, statusMessage: 'Not Found!' })

    return ShareDTO.fromEntityNoPassword(entity).getFull()
})