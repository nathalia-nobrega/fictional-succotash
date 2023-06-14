import { FastifyInstance } from 'fastify'
import { TodoController } from './todoController'
import { $ref } from './todoSchema'
import { $ref as uRef } from '../user/userSchema'

export async function todoRoutes(app: FastifyInstance) {
  const todoController = new TodoController()
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify
  })
  app.get(
    '/',
    {
      schema: {
        response: { 200: $ref('todosResponseSchema') },
      },
    },
    todoController.getAllTodos,
  )

  app.get(
    '/:id',
    {
      schema: {
        response: { 200: $ref('todoResponseSchema') },
        params: uRef('idSchema'),
      },
    },
    todoController.getTodoById,
  )
  app.post(
    '/',
    {
      schema: {
        body: $ref('createTodoSchema'),
        response: { 201: $ref('todoResponseSchema') },
      },
    },
    todoController.createTodo,
  )

  app.put(
    '/:id',
    {
      schema: {
        body: $ref('updateTodoSchema'),
        response: { 201: $ref('todoResponseSchema') },
        params: uRef('idSchema'),
      },
    },
    todoController.updateTodo,
  )

  app.delete(
    '/:id',
    { schema: { params: uRef('idSchema') } },
    todoController.deleteTodoById,
  )
}
