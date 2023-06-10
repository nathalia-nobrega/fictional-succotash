import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const recipeCategoryInput = {
  recipeId: z.number(),
  categoryId: z.number(),
}

const deleteRecipeCategoryInput = {
  recipeId: z.number().optional(),
  categoryId: z.number().optional(),
}

const createRecipeCategorySchema = z.object({
  ...recipeCategoryInput,
})

const deleteRecipeCategorySchema = z.object({
  ...deleteRecipeCategoryInput,
})

const recipeCategoryResponseSchema = z.object({
  ...recipeCategoryInput,
})
const recipiesCategoriesResponseSchema = z.array(recipeCategoryResponseSchema)

export type CreateRecipeCategoryInput = z.infer<
  typeof createRecipeCategorySchema
>
export type DeleteRecipeCategoryInput = z.infer<
  typeof deleteRecipeCategorySchema
>

export const { schemas: recipeCategorySchema, $ref } = buildJsonSchemas(
  {
    createRecipeCategorySchema,
    deleteRecipeCategorySchema,
    recipeCategoryResponseSchema,
    recipiesCategoriesResponseSchema,
  },
  { $id: 'recipeCategorySchemaID' },
)
