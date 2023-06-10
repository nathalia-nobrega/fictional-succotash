import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers/userControllers'
import { $ref } from '../schemas/userSchema'

// TODO: Refactor route so that it satisfies OAuth logic
export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController()

  app.get(
    '/',
    { schema: { response: { 200: $ref('usersResponseSchema') } } },
    userController.getAllUsers,
  )

  app.get(
    '/:userId',
    {
      schema: {
        response: { 200: $ref('userResponseSchema') },
        params: $ref('userIdSchema'),
      },
    },
    userController.getUserById,
  )

  app.post(
    '/',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: { 201: $ref('userResponseSchema') },
      },
    },
    userController.createUser,
  )

  app.put(
    '/:userId',
    {
      schema: {
        body: $ref('updateUserSchema'),
        response: { 201: $ref('userResponseSchema') },
        params: $ref('userIdSchema'),
      },
    },
    userController.updateUser,
  )

  app.delete(
    '/:userId',
    { schema: { params: $ref('userIdSchema') } },
    userController.deleteUser,
  )
}
