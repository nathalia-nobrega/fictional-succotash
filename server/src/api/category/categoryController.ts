import { FastifyReply, FastifyRequest } from 'fastify'
import { IdParamsInput } from '../user/userSchema'
import { CreateCategoryInput, UpdateCategoryInput } from './categorySchema'
import { create, deleteById, getAll, getById, update } from './categoryService'

export class CategoryController {
  async getAllCategories(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub
    return getAll(userId)
  }

  async getCategoryById(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { id } = { ...req.params }
    const reqUser = req.user.sub

    const category = await getById(reqUser, id)
    if (category.userId !== reqUser) return res.code(401)
    return category
  }

  async createCategory(
    req: FastifyRequest<{
      Body: CreateCategoryInput
    }>,
    res: FastifyReply,
  ) {
    const userId = req.user.sub

    const data = { ...req.body, userId }
    res.code(201)
    return create(data)
  }

  async updateCategory(
    req: FastifyRequest<{ Body: UpdateCategoryInput; Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { id } = { ...req.params }
    const reqUser = req.user.sub

    const category = await getById(reqUser, id)
    if (category.userId !== reqUser) return res.code(401)

    const userId = reqUser
    const data = { ...req.body }
    return update(data, userId, id)
  }

  async deleteCategoryById(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { id } = { ...req.params }
    const reqUser = req.user.sub

    const category = await getById(reqUser, id)
    if (category.userId !== reqUser) return res.code(401)
    const userId = reqUser
    res.code(204)
    deleteById(userId, id)
  }
}
