import { FastifyInstance } from 'fastify'
import { RecipeController } from '../controllers/recipeController'
import { $ref } from '../schemas/recipeSchemas'

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
      },
    },
    recipeController.updateRecipe,
  )

  app.delete('/:id', recipeController.deleteRecipe)
}
