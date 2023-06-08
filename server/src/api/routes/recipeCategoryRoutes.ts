import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { Prisma } from '@prisma/client'

// TODO: Refactor route so that it satisfies OAuth logic
export async function recipeCategoryRoutes(app: FastifyInstance) {
  app.get('/', async (req, res) => {
    return await prisma.recipeCategory.findMany()
  })

  app.post('/', async (req, res) => {
    const bodySchema = z.object({
      recipeId: z.number(),
      categoryId: z.number(),
    })
    const { recipeId, categoryId } = bodySchema.parse(req.body)

    await prisma.recipeCategory.create({
      data: {
        recipeId,
        categoryId,
      },
    })

    return prisma.recipeCategory.findMany()
  })

  app.delete('/:categoryId/:recipeId', async (req, res) => {
    const paramsSchema = z.object({
      recipeId: z.number(),
      categoryId: z.number(),
    })

    const { recipeId, categoryId } = paramsSchema.parse(req.params)

    return await prisma.recipeCategory.delete({
      where: {
        recipeId_categoryId: {
          recipeId,
          categoryId,
        },
      },
    })
  })

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
