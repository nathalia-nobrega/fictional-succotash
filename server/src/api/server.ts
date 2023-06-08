import fastify from 'fastify'
import { categoryRoutes } from './routes/categoryRoutes'
import { recipeCategoryRoutes } from './routes/recipeCategoryRoutes'
import { recipeRoutes } from './routes/recipeRoutes'
import { todoRoutes } from './routes/todoRoutes'
import { userRoutes } from './routes/userRoutes'
import { recipeSchemas } from './schemas/recipeSchemas'
import { userSchema } from './schemas/userSchema'
import { categorySchema } from './schemas/categorySchema'

export async function startServer() {
  const app = fastify()

  for (const schema of [...recipeSchemas, ...userSchema, ...categorySchema]) {
    app.addSchema(schema)
  }

  app.register(userRoutes, { prefix: '/users' })
  app.register(recipeRoutes, { prefix: '/users/:userId/recipies' })
  app.register(todoRoutes, { prefix: '/users/:userId/todos' })
  app.register(categoryRoutes, { prefix: '/users/:userId/categories' })
  app.register(recipeCategoryRoutes, { prefix: '/recipiesCategories' })

  try {
    await app
      .listen({
        port: 3333,
        host: '0.0.0.0',
      })
      .then(() => {
        console.log('Server running on http://localhost:3333')
      })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
