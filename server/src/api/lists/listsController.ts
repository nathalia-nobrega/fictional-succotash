import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateListInput, DeleteListInput } from './listsSchema'
import { create, deleteById, getAll, getById } from './listsService'

export class RecipeCategoryCategoryController {
  async getAllRecipiesCategories(req: FastifyRequest, res: FastifyReply) {
    return getAll()
  }

  async getRecipeCategoryById(
    req: FastifyRequest<{ Params: CreateListInput }>,
    res: FastifyReply,
  ) {
    const { recipeId, categoryId } = { ...req.params }

    return getById(recipeId, categoryId)
  }

  async createRecipeCategory(
    req: FastifyRequest<{ Body: CreateListInput }>,
    res: FastifyReply,
  ) {
    const data = { ...req.body }
    res.code(201)
    return create(data)
  }

  async deleteRecipeCategory(
    req: FastifyRequest<{ Body: DeleteListInput }>,
    res: FastifyReply,
  ) {
    const data = { ...req.body }
    res.code(204)
    deleteById(data)
  }
}
