import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { authRoute } from './auth/authRoute'
import { categoryRoutes } from './category/categoryRoutes'
import { categorySchema } from './category/categorySchema'
import { listsRoutes } from './lists/listsRoutes'
import { listsSchema } from './lists/listsSchema'
import { recipeRoutes } from './recipe/recipeRoutes'
import { recipeSchemas } from './recipe/recipeSchemas'
import { todoRoutes } from './todo/todoRoutes'
import { todoSchema } from './todo/todoSchema'
import { userRoutes } from './user/userRoutes'
import { userSchema } from './user/userSchema'

export async function startServer() {
  const app = fastify({
    logger: true,
  })

  for (const schema of [
    ...recipeSchemas,
    ...userSchema,
    ...categorySchema,
    ...todoSchema,
    ...listsSchema,
  ]) {
    app.addSchema(schema)
  }

  app.register(userRoutes, { prefix: 'api/users' })
  app.register(recipeRoutes, { prefix: 'api/recipies' })
  app.register(todoRoutes, { prefix: 'api/todos' })
  app.register(categoryRoutes, { prefix: 'api/categories' })
  app.register(listsRoutes, { prefix: 'api/lists' })
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
