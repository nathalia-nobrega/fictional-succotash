import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'
// todo: try to find a better way to reference this schema
const recipeInput = {
  name: z.string().trim().min(1),
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

const recipeResponseSchema = z.object({
  ...recipeInput,
  ...recipeGenerated,
})

const createCategoryInput = {
  title: z.string().trim().min(1),
}
const updateCategoryInput = {
  title: z.string(),
  recipies: z.array(recipeResponseSchema),
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
