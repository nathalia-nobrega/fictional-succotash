import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  CreateRecipeCategoryInput,
  DeleteRecipeCategoryInput,
} from '../schemas/recipeCategorySchema'
import {
  create,
  deleteById,
  getAll,
  getById,
} from '../services/recipeCategoryService'

export class RecipeCategoryCategoryController {
  async getAllRecipiesCategories(req: FastifyRequest, res: FastifyReply) {
    return getAll()
  }

  async getRecipeCategoryById(req: FastifyRequest, res: FastifyReply) {
    const paramsSchema = z.object({
      recipeId: z.coerce.number(),
      categoryId: z.coerce.number(),
    })

    const { recipeId, categoryId } = paramsSchema.parse(req.params)

    return getById(recipeId, categoryId)
  }

  async createRecipeCategory(
    req: FastifyRequest<{ Body: CreateRecipeCategoryInput }>,
    res: FastifyReply,
  ) {
    const data = { ...req.body }
    create(data)
  }

  async deleteRecipeCategory(
    req: FastifyRequest<{ Body: DeleteRecipeCategoryInput }>,
    res: FastifyReply,
  ) {
    const data = { ...req.body }
    deleteById(data)
  }
}
