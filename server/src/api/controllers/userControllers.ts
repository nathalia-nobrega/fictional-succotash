import { FastifyRequest, FastifyReply } from 'fastify'
import {
  getAll,
  getById,
  create,
  deleteById,
  update,
} from '../services/userService'
import { z } from 'zod'
import { CreateUserInput, UpdateUserInput } from '../schemas/userSchema'

export class UserController {
  async getAllUsers(req: FastifyRequest, res: FastifyReply) {
    return getAll()
  }

  async getUserById(req: FastifyRequest, res: FastifyReply) {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })
    const { userId } = paramsSchema.parse(req.params)

    return getById(userId)
  }

  async createUser(
    req: FastifyRequest<{ Body: CreateUserInput }>,
    res: FastifyReply,
  ) {
    const data = { ...req.body }

    console.log({ ...req.body })
    res.code(201)
    return create(data)
  }

  async updateUser(
    req: FastifyRequest<{ Body: UpdateUserInput }>,
    res: FastifyReply,
  ) {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(req.params)

    const data = { ...req.body, userId }
    res.code(204)

    return update(data)
  }

  async deleteUser(req: FastifyRequest, res: FastifyReply) {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(req.params)
    res.code(204)
    deleteById(userId)
  }
}
