import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const recipeInput = {
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.string().nullable(),
  portionsQtd: z.coerce.number().nullable(),
  timeToCook: z.string().nullable(),
  mediaLinks: z.array(z.string()),
}

const recipeGenerated = {
  id: z.number(),
  createdAt: z.coerce.date(),
}

const createRecipeSchema = z.object({
  ...recipeInput,
})
const recipeResponseSchema = z.object({
  ...recipeInput,
  ...recipeGenerated,
})

const recipiesResponseSchema = z.array(recipeResponseSchema)

export type CreateProductInpput = z.infer<typeof createRecipeSchema>

export const { schemas: recipeSchemas, $ref } = buildJsonSchemas({
  createRecipeSchema,
  recipeResponseSchema,
  recipiesResponseSchema,
})
