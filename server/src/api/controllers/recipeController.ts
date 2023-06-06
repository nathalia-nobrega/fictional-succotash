import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { getAll, getById } from '../services/recipeService'
import { Recipe } from '@prisma/client'

export class RecipeController {
  async getAllRecipies(
    req: FastifyRequest,
    res: FastifyReply,
  ): Promise<Recipe[]> {
    // Validating the params of the request
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(req.params)

    return getAll(userId)
  }

  async getRecipeById(req: FastifyRequest, res: FastifyReply): Promise<Recipe> {
    // Validating the request's params
    const paramsSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramsSchema.parse(req.params)
    return getById(userId, id)
  }

  // TODO: Implement createRecipe
  // async createRecipe(req: FastifyRequest, res: FastifyReply): Promise<Recipe> {}
}
