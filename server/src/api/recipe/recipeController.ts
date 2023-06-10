import { FastifyReply, FastifyRequest } from 'fastify'
import { create, deleteById, getAll, getById, update } from './recipeService'
import { IdParamsInput, UserIdParamsInput } from '../user/userSchema'
import { CreateRecipeInput, UpdateRecipeInput } from './recipeSchemas'

export class RecipeController {
  async getAllRecipies(
    req: FastifyRequest<{ Params: UserIdParamsInput }>,
    res: FastifyReply,
  ) {
    const params = req.params.userId
    return getAll(params)
  }

  async getRecipeById(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId, id } = { ...req.params }
    return getById(userId, id)
  }

  async createRecipe(
    req: FastifyRequest<{ Body: CreateRecipeInput; Params: UserIdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId } = { ...req.params }
    const data = { ...req.body, userId }
    res.code(201)
    return create(data)
  }

  async updateRecipe(
    req: FastifyRequest<{ Body: UpdateRecipeInput; Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId, id } = { ...req.params }

    const data = { ...req.body }

    return update(data, userId, id)
  }

  async deleteRecipe(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId, id } = { ...req.params }
    res.code(204)
    deleteById(userId, id)
  }
}
