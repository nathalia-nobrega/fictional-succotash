import { FastifyInstance } from 'fastify'
import { RecipeController } from './recipeController'
import { $ref } from './recipeSchemas'
import { $ref as uRef } from '../user/userSchema'

const recipeController = new RecipeController()

// TODO: Refactor route so that it satisfies OAuth logic
export async function recipeRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
  app.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('recipiesResponseSchema'),
        },
      },
    },
    recipeController.getAllRecipies,
  )

  app.get(
    '/:id',
    {
      schema: {
        response: {
          200: $ref('recipeResponseSchema'),
        },
        params: uRef('idSchema'),
      },
    },
    recipeController.getRecipeById,
  )

  app.post(
    '/',
    {
      schema: {
        body: $ref('createRecipeSchema'),
        response: { 201: $ref('recipeResponseSchema') },
      },
    },
    recipeController.createRecipe,
  )

  app.put(
    '/:id',
    {
      schema: {
        body: $ref('updateRecipeSchema'),
        response: { 201: $ref('recipeResponseSchema') },
        params: uRef('idSchema'),
      },
    },
    recipeController.updateRecipe,
  )

  app.delete(
    '/:id',
    { schema: { params: uRef('idSchema') } },
    recipeController.deleteRecipe,
  )
}
