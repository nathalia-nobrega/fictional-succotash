import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserInput, UpdateUserInput } from './userSchema'
import { create, deleteById, getAll, getById, update } from './userService'

export class UserController {
  async getAllUsers(req: FastifyRequest, res: FastifyReply) {
    return getAll()
  }

  async getUserById(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub
    return getById(userId)
  }

  async createUser(
    req: FastifyRequest<{ Body: CreateUserInput }>,
    res: FastifyReply,
  ) {
    const data = { ...req.body }

    res.code(201)
    return create(data)
  }

  async updateUser(
    req: FastifyRequest<{ Body: UpdateUserInput }>,
    res: FastifyReply,
  ) {
    const userId = req.user.sub
    const data = { ...req.body, userId }

    res.code(204)

    return update(data)
  }

  async deleteUser(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub
    res.code(204)
    deleteById(userId)
  }
}
