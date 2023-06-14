import { FastifyReply, FastifyRequest } from 'fastify'
import { create, deleteById, getAll, getById, update } from './recipeService'
import { IdParamsInput } from '../user/userSchema'
import { CreateRecipeInput, UpdateRecipeInput } from './recipeSchemas'

export class RecipeController {
  async getAllRecipies(req: FastifyRequest, res: FastifyReply) {
    const reqUser = req.user.sub

    return await getAll(reqUser)
  }

  async getRecipeById(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { id } = { ...req.params }
    const reqUser = req.user.sub
    const recipe = await getById(reqUser, id)
    if (recipe.userId !== reqUser) return res.code(401)

    return recipe
  }

  async createRecipe(
    req: FastifyRequest<{ Body: CreateRecipeInput }>,
    res: FastifyReply,
  ) {
    const reqUser = req.user.sub
    const data = { ...req.body, userId: reqUser }
    res.code(201)
    return create(data)
  }

  async updateRecipe(
    req: FastifyRequest<{ Body: UpdateRecipeInput; Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { id } = { ...req.params }
    const reqUser = req.user.sub
    const recipe = await getById(reqUser, id)
    if (recipe.userId !== reqUser) return res.code(401)

    const data = { ...req.body }
    const userId = reqUser

    return update(data, userId, id)
  }

  async deleteRecipe(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { id } = { ...req.params }
    const reqUser = req.user.sub
    const recipe = await getById(reqUser, id)
    if (recipe.userId !== reqUser) return res.code(401)
    deleteById(reqUser, id)
    res.code(204)
  }
}
