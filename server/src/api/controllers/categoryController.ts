import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from '../services/categoryService'
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../schemas/categorySchema'

export class CategoryController {
  async getAllCategories(req: FastifyRequest, res: FastifyReply) {
    const paramSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramSchema.parse(req.params)

    return getAll(userId)
  }

  async getCategoryById(req: FastifyRequest, res: FastifyReply) {
    const paramSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramSchema.parse(req.params)

    return getById(userId, id)
  }

  async createCategory(
    req: FastifyRequest<{ Body: CreateCategoryInput }>,
    res: FastifyReply,
  ) {
    const paramSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramSchema.parse(req.params)

    const data = { ...req.body, userId }
    res.code(201)
    return create(data)
  }

  async updateCategory(
    req: FastifyRequest<{ Body: UpdateCategoryInput }>,
    res: FastifyReply,
  ) {
    const paramSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramSchema.parse(req.params)

    const data = { ...req.body }
    return update(data, userId, id)
  }

  async deleteCategoryById(req: FastifyRequest, res: FastifyReply) {
    const paramSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramSchema.parse(req.params)
    res.code(204)
    return deleteById(userId, id)
  }
}
