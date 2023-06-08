import { FastifyInstance } from 'fastify'
import { TodoController } from '../controllers/todoController'
import { $ref } from '../schemas/todoSchema'

// TODO: Remove :id from the URL params to satisfy the logic with OAuth
export async function todoRoutes(app: FastifyInstance) {
  const todoController = new TodoController()
  app.get(
    '/',
    { schema: { response: { 200: $ref('todosResponseSchema') } } },
    todoController.getAllTodos,
  )

  app.get(
    '/:id',
    { schema: { response: { 200: $ref('todoResponseSchema') } } },
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
      },
    },
    todoController.updateTodo,
  )

  app.delete('/:id', todoController.deleteTodoById)
}
