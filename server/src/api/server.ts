import fastify from 'fastify'
import { categoryRoutes } from './category/categoryRoutes'
import { recipeCategoryRoutes } from './recipeCategory/recipeCategoryRoutes'
import { recipeRoutes } from './recipe/recipeRoutes'
import { todoRoutes } from './todo/todoRoutes'
import { userRoutes } from './user/userRoutes'
import { recipeSchemas } from './recipe/recipeSchemas'
import { userSchema } from './user/userSchema'
import { categorySchema } from './category/categorySchema'
import { todoSchema } from './todo/todoSchema'
import { recipeCategorySchema } from './recipeCategory/recipeCategorySchema'
import { authRoute } from './auth/authRoute'

export async function startServer() {
  const app = fastify({
    logger: true,
  })

  for (const schema of [
    ...recipeSchemas,
    ...userSchema,
    ...categorySchema,
    ...todoSchema,
    ...recipeCategorySchema,
  ]) {
    app.addSchema(schema)
  }

  app.register(userRoutes, { prefix: 'api/users' })
  app.register(recipeRoutes, { prefix: 'api/users/:userId/recipies' })
  app.register(todoRoutes, { prefix: 'api/users/:userId/todos' })
  app.register(categoryRoutes, { prefix: 'api/users/:userId/categories' })
  app.register(recipeCategoryRoutes, { prefix: 'api/recipiesCategories' })
  app.register(authRoute, { prefix: '/api/oauth' })

  try {
    await app.listen({
      port: 3333,
      host: '0.0.0.0',
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
