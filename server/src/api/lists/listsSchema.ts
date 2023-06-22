import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const listsInput = {
  recipeId: z.number(),
  categoryId: z.number(),
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
const listsResponseSchema = z.array(listResponseSchema)

export type CreateListInput = z.infer<typeof createListSchema>
export type DeleteListInput = z.infer<typeof deleteListSchema>

export const { schemas: listsSchema, $ref } = buildJsonSchemas(
  {
    createListSchema,
    deleteListSchema,
    listResponseSchema,
    listsResponseSchema,
  },
  { $id: 'listsSchemaID' },
)
