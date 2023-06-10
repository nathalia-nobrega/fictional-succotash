import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const recipeInput = {
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.string().nullable(),
  portionsQtd: z.coerce.number().nullable(),
  timeToCook: z.string().nullable(),
  mediaLinks: z.array(z.string()),
}

const updateRecipeInput = {
  name: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  instructions: z.string().nullable().optional(),
  portionsQtd: z.coerce.number().nullable().optional(),
  timeToCook: z.string().nullable().optional(),
  mediaLinks: z.array(z.string()).optional(),
}

const recipeGenerated = {
  id: z.number(),
  createdAt: z.date(),
}

const createRecipeSchema = z.object({
  ...recipeInput,
})

const updateRecipeSchema = z.object({
  ...updateRecipeInput,
})

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
