import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateRecipeInput, UpdateRecipeInput } from '../schemas/recipeSchemas'
import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from '../services/recipeService'

export class RecipeController {
  async getAllRecipies(req: FastifyRequest, res: FastifyReply) {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(req.params)

    return getAll(userId)
  }

  async getRecipeById(req: FastifyRequest, res: FastifyReply) {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramsSchema.parse(req.params)

    return getById(userId, id)
  }

  async createRecipe(
    req: FastifyRequest<{ Body: CreateRecipeInput }>,
    res: FastifyReply,
  ) {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(req.params)

    const data = { ...req.body, userId }
    create(data)
  }

  async updateRecipe(
    req: FastifyRequest<{ Body: UpdateRecipeInput }>,
    res: FastifyReply,
  ) {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramsSchema.parse(req.params)

    const data = { ...req.body }

    update(data, userId, id)
  }

  async deleteRecipe(req: FastifyRequest, res: FastifyReply) {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramsSchema.parse(req.params)
    deleteById(userId, id)
  }
}
