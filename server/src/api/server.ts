import fastify from 'fastify'
import { categoryRoutes } from './routes/categoryRoutes'
import { recipeCategoryRoutes } from './routes/recipeCategoryRutes'
import { recipeRoutes } from './routes/recipeRoutes'
import { todoRoutes } from './routes/todoRoutes'
import { userRoutes } from './routes/userRoutes'

export async function startServer() {
  const app = fastify()

  app.register(userRoutes)
  app.register(recipeRoutes)
  app.register(todoRoutes)
  app.register(categoryRoutes)
  app.register(recipeCategoryRoutes)

  app
    .listen({
      port: 3333,
      host: '0.0.0.0',
    })
    .then(() => {
      console.log('Server running on http://localhost:3333')
    })
}
