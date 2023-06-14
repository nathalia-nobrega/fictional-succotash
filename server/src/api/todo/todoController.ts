import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateTodoInput, UpdateTodoInput } from './todoSchema'
import { IdParamsInput } from '../user/userSchema'
import { create, deleteById, getAll, getById, update } from './todoService'

export class TodoController {
  async getAllTodos(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub

    return getAll(userId)
  }

  async getTodoById(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { id } = { ...req.params }
    const userId = req.user.sub

    return getById(userId, id)
  }

  async createTodo(
    req: FastifyRequest<{ Body: CreateTodoInput }>,
    res: FastifyReply,
  ) {
    const userId = req.user.sub
    const data = { ...req.body, userId }
    res.code(201)
    return create(data)
  }

  async updateTodo(
    req: FastifyRequest<{ Body: UpdateTodoInput; Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { id } = { ...req.params }
    const userId = req.user.sub

    const data = { ...req.body }
    return update(data, userId, id)
  }

  async deleteTodoById(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { id } = { ...req.params }
    const userId = req.user.sub

    res.code(204)
    return deleteById(userId, id)
  }
}
