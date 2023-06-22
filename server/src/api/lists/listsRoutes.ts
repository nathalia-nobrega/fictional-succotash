import { Prisma } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
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

  app.get('/all', async (req, res) => {
    const sql = Prisma.raw(`SELECT "Recipe"."name", "Category".title
    FROM "Recipe"
    JOIN "RecipeCategory" ON "RecipeCategory"."recipeId" = "Recipe".id
    JOIN "Category" ON "Category".id = "RecipeCategory"."categoryId"`)
    return await prisma.$queryRaw`${sql}`
  })
}
