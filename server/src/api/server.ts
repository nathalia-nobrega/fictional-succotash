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
