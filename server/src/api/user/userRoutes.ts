import { FastifyInstance } from 'fastify'
import { UserController } from './userControllers'
import { $ref } from './userSchema'

// TODO: Refactor route so that it satisfies OAuth logic
export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController()
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get(
    '/all',
    { schema: { response: { 200: $ref('usersResponseSchema') } } },
    userController.getAllUsers,
  )

  app.get(
    '/',
    {
      schema: {
        response: { 200: $ref('userResponseSchema') },
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
    '/',
    {
      schema: {
        body: $ref('updateUserSchema'),
        response: { 201: $ref('userResponseSchema') },
      },
    },
    userController.updateUser,
  )

  app.delete('/', userController.deleteUser)
}
