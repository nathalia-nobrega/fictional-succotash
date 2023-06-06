import { z } from 'zod'
import { Recipe } from '../../types/Recipe'

export const createRecipeSchema: z.ZodType<Recipe> = z.object({
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.string(),
  portionsQtd: z.coerce.number(),
  timeToCook: z.string(),
  mediaLinks: z.array(z.string()),
})
