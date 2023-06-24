import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const listsInput = {
  recipeId: z.number(),
  categoryId: z.number(),
}

const listsExpandedInput = {
  name: z.string(), // recipe
  title: z.string(), // category
}

const listsCategoriesCountInput = {
  id: z.coerce.number(),
  count: z.coerce.number(),
  title: z.string(),
}

const deleteListInput = {
  recipeId: z.number().optional(),
  categoryId: z.number().optional(),
}

const createListSchema = z.object({
  ...listsInput,
})

const deleteListSchema = z.object({
  ...deleteListInput,
})

const listResponseSchema = z.object({
  ...listsInput,
})

const listExpandedResponseSchema = z.object({
  ...listsExpandedInput,
})

const listCategoriesCountResponseSchema = z.object({
  ...listsCategoriesCountInput,
})

const listsResponseSchema = z.array(listResponseSchema)
const listsExpandedResponseSchema = z.array(listExpandedResponseSchema)
const listsCategoriesCountResponseSchema = z.array(
  listCategoriesCountResponseSchema,
)

export type CreateListInput = z.infer<typeof createListSchema>
export type DeleteListInput = z.infer<typeof deleteListSchema>

export const { schemas: listsSchema, $ref } = buildJsonSchemas(
  {
    createListSchema,
    deleteListSchema,
    listResponseSchema,
    listsResponseSchema,
    listsExpandedResponseSchema,
    listsCategoriesCountResponseSchema,
  },
  { $id: 'listsSchemaID' },
)
