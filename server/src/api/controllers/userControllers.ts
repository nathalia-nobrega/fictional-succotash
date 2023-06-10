import { FastifyReply, FastifyRequest } from 'fastify'
import {
  CreateUserInput,
  UpdateUserInput,
  UserIdParamsInput,
} from '../schemas/userSchema'
import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from '../services/userService'

export class UserController {
  async getAllUsers(req: FastifyRequest, res: FastifyReply) {
    return getAll()
  }

  async getUserById(
    req: FastifyRequest<{ Params: UserIdParamsInput }>,
    res: FastifyReply,
  ) {
    const params = { ...req.params }
    return getById(params.userId)
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
    req: FastifyRequest<{ Body: UpdateUserInput; Params: UserIdParamsInput }>,
    res: FastifyReply,
  ) {
    const userId = req.params.userId
    const data = { ...req.body, userId }

    res.code(204)

    return update(data)
  }

  async deleteUser(
    req: FastifyRequest<{ Params: UserIdParamsInput }>,
    res: FastifyReply,
  ) {
    const userId = req.params.userId
    res.code(204)
    deleteById(userId)
  }
}
