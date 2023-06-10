import { Prisma } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { RecipeCategoryCategoryController } from './recipeCategoryController'
import { prisma } from '../../lib/prisma'
import { $ref } from './recipeCategorySchema'

// TODO: Refactor route so that it satisfies OAuth logic
export async function recipeCategoryRoutes(app: FastifyInstance) {
  const rcController = new RecipeCategoryCategoryController()

  app.get(
    '/',
    { schema: { response: { 200: $ref('recipiesCategoriesResponseSchema') } } },
    rcController.getAllRecipiesCategories,
  )

  app.get(
    '/:recipeId/:categoryId',
    { schema: { response: { 200: $ref('recipeCategoryResponseSchema') } } },
    rcController.getRecipeCategoryById,
  )

  app.post(
    '/',
    {
      schema: {
        body: $ref('createRecipeCategorySchema'),
        response: { 201: $ref('recipeCategoryResponseSchema') },
      },
    },
    rcController.createRecipeCategory,
  )

  app.delete(
    '/',
    { schema: { body: $ref('deleteRecipeCategorySchema') } },
    rcController.deleteRecipeCategory,
  )

  // TODO: Refactor this
  app.get('/testing', async (req, res) => {
    const sql =
      Prisma.raw(`SELECT "Recipe"."name", "Recipe"."timeToCook", "Category".title
    FROM "Recipe"
    JOIN "RecipeCategory" ON "RecipeCategory"."recipeId" = "Recipe".id
    JOIN "Category" ON "Category".id = "RecipeCategory"."categoryId"`)
    return await prisma.$queryRaw`${sql}`
  })
}
