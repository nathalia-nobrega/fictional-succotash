import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  create,
  deleteById,
  getAll,
  getById,
  update,
} from '../services/todoService'
import { CreateTodoInput, UpdateTodoInput } from '../schemas/todoSchema'

export class TodoController {
  async getAllTodos(req: FastifyRequest, res: FastifyReply) {
    const paramSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramSchema.parse(req.params)

    return getAll(userId)
  }

  async getTodoById(req: FastifyRequest, res: FastifyReply) {
    const paramSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramSchema.parse(req.params)

    return getById(userId, id)
  }

  async createTodo(
    req: FastifyRequest<{ Body: CreateTodoInput }>,
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

  async updateTodo(
    req: FastifyRequest<{ Body: UpdateTodoInput }>,
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

  async deleteTodoById(req: FastifyRequest, res: FastifyReply) {
    const paramSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramSchema.parse(req.params)
    res.code(204)
    return deleteById(userId, id)
  }
}
