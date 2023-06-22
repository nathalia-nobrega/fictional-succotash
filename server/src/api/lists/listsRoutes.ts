import { FastifyInstance } from 'fastify'
import { RecipeCategoryCategoryController } from './listsController'
import { $ref } from './listsSchema'

// TODO: Refactor route so that it satisfies OAuth logic
export async function listsRoutes(app: FastifyInstance) {
  const rcController = new RecipeCategoryCategoryController()
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get(
    '/',
    { schema: { response: { 200: $ref('listsResponseSchema') } } },
    rcController.getAllRecipiesCategories,
  )

  app.get(
    '/:recipeId/:categoryId',
    { schema: { response: { 200: $ref('listResponseSchema') } } },
    rcController.getRecipeCategoryById,
  )

  app.post(
    '/',
    {
      schema: {
        body: $ref('createListSchema'),
        response: { 201: $ref('listResponseSchema') },
      },
    },
    rcController.createRecipeCategory,
  )

  app.delete(
    '/',
    { schema: { body: $ref('deleteListSchema') } },
    rcController.deleteRecipeCategory,
  )

  app.get(
    '/all',
    {
      schema: { response: { 200: $ref('listsExpandedResponseSchema') } },
    },
    rcController.getAllRecipiesCategoriesExpanded,
  )

  app.get(
    '/all/categories/count',
    {
      schema: { response: { 200: $ref('listsCategoriesCountResponseSchema') } },
    },
    rcController.getCategoriesCountByRecipe,
  )
}
