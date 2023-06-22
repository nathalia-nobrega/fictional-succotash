import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const createCategoryInput = {
  title: z.string().trim().min(1),
}
const updateCategoryInput = {
  title: z.string(),
}

const categoryGenerated = {
  id: z.coerce.number(),
  updatedAt: z.coerce.date(),
}

const createCategorySchema = z.object({
  ...createCategoryInput,
})
const updateCategorySchema = z.object({
  ...updateCategoryInput,
})

const categoryResponseSchema = z.object({
  ...createCategoryInput,
  ...categoryGenerated,
})
const categoriesResponseSchema = z.array(categoryResponseSchema)

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>

export const { schemas: categorySchema, $ref } = buildJsonSchemas(
  {
    createCategorySchema,
    updateCategorySchema,
    categoryResponseSchema,
    categoriesResponseSchema,
  },
  { $id: 'categorySchemaID' },
)
