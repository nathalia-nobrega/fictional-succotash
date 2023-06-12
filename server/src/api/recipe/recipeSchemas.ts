import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const recipeInput = {
  name: z.string().trim().min(1),
  ingredients: z.array(z.string()),
  instructions: z.string().nullable(),
  portionsQtd: z.coerce.number().nullable(),
  timeToCook: z.string().nullable(),
  mediaLinks: z.array(z.string()),
}

const updateRecipeInput = {
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.string().nullable(),
  portionsQtd: z.coerce.number().nullable(),
  timeToCook: z.string().nullable(),
  mediaLinks: z.array(z.string()),
}

const recipeGenerated = {
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.coerce.date(),
}

const createRecipeSchema = z.object({
  ...recipeInput,
})

const updateRecipeSchema = z
  .object({
    ...updateRecipeInput,
  })
  .partial()

const recipeResponseSchema = z.object({
  ...recipeInput,
  ...recipeGenerated,
})
const recipiesResponseSchema = z.array(recipeResponseSchema)

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>

export const { schemas: recipeSchemas, $ref } = buildJsonSchemas(
  {
    createRecipeSchema,
    updateRecipeSchema,
    recipeResponseSchema,
    recipiesResponseSchema,
  },
  { $id: 'recipeSchemaID' },
)
