import { FastifyReply, FastifyRequest } from 'fastify'
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../schemas/categorySchema'
import { IdParamsInput, UserIdParamsInput } from '../schemas/userSchema'
import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from '../services/categoryService'

export class CategoryController {
  async getAllCategories(
    req: FastifyRequest<{ Params: UserIdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId } = { ...req.params }

    return getAll(userId)
  }

  async getCategoryById(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId, id } = { ...req.params }

    return getById(userId, id)
  }

  async createCategory(
    req: FastifyRequest<{
      Body: CreateCategoryInput
      Params: UserIdParamsInput
    }>,
    res: FastifyReply,
  ) {
    const { userId } = { ...req.params }

    const data = { ...req.body, userId }
    res.code(201)
    return create(data)
  }

  async updateCategory(
    req: FastifyRequest<{ Body: UpdateCategoryInput; Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId, id } = { ...req.params }

    const data = { ...req.body }
    return update(data, userId, id)
  }

  async deleteCategoryById(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId, id } = { ...req.params }
    res.code(204)
    return deleteById(userId, id)
  }
}
