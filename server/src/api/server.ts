import fastify from 'fastify'
import { categoryRoutes } from './category/categoryRoutes'
import { recipeRoutes } from './recipe/recipeRoutes'
import { todoRoutes } from './todo/todoRoutes'
import { userRoutes } from './user/userRoutes'
import { recipeSchemas } from './recipe/recipeSchemas'
import { userSchema } from './user/userSchema'
import { categorySchema } from './category/categorySchema'
import { todoSchema } from './todo/todoSchema'
import { authRoute } from './auth/authRoute'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'

export async function startServer() {
  const app = fastify({
    logger: true,
  })

  for (const schema of [
    ...recipeSchemas,
    ...userSchema,
    ...categorySchema,
    ...todoSchema,
  ]) {
    app.addSchema(schema)
  }

  app.register(userRoutes, { prefix: 'api/users' })
  app.register(recipeRoutes, { prefix: 'api/recipies' })
  app.register(todoRoutes, { prefix: 'api/todos' })
  app.register(categoryRoutes, { prefix: 'api/categories' })
  app.register(authRoute, { prefix: '/api/oauth' })
  app.register(cors, {
    origin: true,
  })
  app.register(jwt, {
    secret: 'fictionalsucc123dasnag_A@',
  })

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
