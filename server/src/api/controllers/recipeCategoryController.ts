import { FastifyReply, FastifyRequest } from 'fastify'
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

  async getRecipeCategoryById(
    req: FastifyRequest<{ Params: CreateRecipeCategoryInput }>,
    res: FastifyReply,
  ) {
    const { recipeId, categoryId } = { ...req.params }

    return getById(recipeId, categoryId)
  }

  async createRecipeCategory(
    req: FastifyRequest<{ Body: CreateRecipeCategoryInput }>,
    res: FastifyReply,
  ) {
    const data = { ...req.body }
    res.code(201)
    create(data)
  }

  async deleteRecipeCategory(
    req: FastifyRequest<{ Body: DeleteRecipeCategoryInput }>,
    res: FastifyReply,
  ) {
    const data = { ...req.body }
    res.code(204)
    deleteById(data)
  }
}
