import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateTodoInput, UpdateTodoInput } from './todoSchema'
import { IdParamsInput, UserIdParamsInput } from '../user/userSchema'
import { create, deleteById, getAll, getById, update } from './todoService'

export class TodoController {
  async getAllTodos(
    req: FastifyRequest<{ Params: UserIdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId } = { ...req.params }

    return getAll(userId)
  }

  async getTodoById(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId, id } = { ...req.params }

    return getById(userId, id)
  }

  async createTodo(
    req: FastifyRequest<{ Body: CreateTodoInput; Params: UserIdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId } = { ...req.params }
    const data = { ...req.body, userId }
    res.code(201)
    return create(data)
  }

  async updateTodo(
    req: FastifyRequest<{ Body: UpdateTodoInput; Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId, id } = { ...req.params }

    const data = { ...req.body }
    return update(data, userId, id)
  }

  async deleteTodoById(
    req: FastifyRequest<{ Params: IdParamsInput }>,
    res: FastifyReply,
  ) {
    const { userId, id } = { ...req.params }
    res.code(204)
    return deleteById(userId, id)
  }
}
