import fastify from 'fastify'
import { userRoutes } from './userRoutes'
import { recipeRoutes } from './recipeRoutes'
export async function startServer() {
  const app = fastify()

  app.register(userRoutes)
  app.register(recipeRoutes)

  app
    .listen({
      port: 3333,
      host: '0.0.0.0',
    })
    .then(() => {
      console.log('Server running on http://localhost:3333')
    })
}
