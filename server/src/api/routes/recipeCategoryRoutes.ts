import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

// TODO: Refactor route so that it satisfies OAuth logic
export async function recipeCategoryRoutes(app: FastifyInstance) {
  app.get('/recipiesCategories', async (req, res) => {
    return await prisma.recipeCategory.findMany()
  })

  app.post('/recipiesCategories', async (req, res) => {
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

  app.delete('/recipiesCategories/:categoryId/:recipeId', async (req, res) => {
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
}
