import type { Share } from "~/server/utils/drizzle";
import { decrypt } from "~/server/utils/crypto"

class ShareDTO {
    id!: number
    slug!: string
    content!: string
    destructable!: boolean
    createdAt!: Date

    public static async fromSlug(slug: string, password: string) {
        const results = await useDrizzle().query.shares.findMany({
            where: (shares, { eq }) => (eq(shares.slug, slug))
        })

        const entity = results[0]

        if (!entity) {
            throw Error('Entity for this slug not found!')
        }

        return ShareDTO.fromEntity(entity, password)
    }

    public static fromEntity(entity: Share, password: string) {
        const shareDTO = new ShareDTO()

        shareDTO.content = entity.content ? decrypt(entity.content, password) : ''
        shareDTO.destructable = Boolean(entity.destructable)
        shareDTO.slug = entity.slug
        shareDTO.createdAt = new Date(entity.createdAt)
        shareDTO.id = entity.id

        return shareDTO
    }

    public static fromEntityNoPassword(entity: Share) {
        const shareDTO = new ShareDTO()

        shareDTO.destructable = Boolean(entity.destructable)
        shareDTO.slug = entity.slug
        shareDTO.createdAt = new Date(entity.createdAt)
        shareDTO.id = entity.id

        return shareDTO
    }

    public getFull() {
        return {
            id: this.id,
            slug: this.slug,
            destructable: this.destructable,
            createdAt: this.createdAt,
            content: this.content
        }
    }

    public getPartial() {
        return {
            id: this.id,
            slug: this.slug,
            destructable: this.destructable,
            createdAt: this.createdAt
        }
    }
}

export default ShareDTO;