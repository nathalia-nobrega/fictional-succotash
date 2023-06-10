import { FastifyInstance } from 'fastify'
import { RecipeController } from '../controllers/recipeController'
import { $ref } from '../schemas/recipeSchemas'
import { $ref as uRef } from '../schemas/userSchema'

const recipeController = new RecipeController()

// TODO: Refactor route so that it satisfies OAuth logic
export async function recipeRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('recipiesResponseSchema'),
        },
        params: uRef('userIdSchema'),
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
        params: uRef('userIdSchema'),
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
