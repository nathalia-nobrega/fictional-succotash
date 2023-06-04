import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

// TODO: Refactor route so that it satisfies OAuth logic
export async function recipeRoutes(app: FastifyInstance) {
  app.get('/recipies', async () => {
    return await prisma.recipe.findMany
  })

  app.get('/recipies/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    return await prisma.recipe.findUniqueOrThrow({
      where: {
        id,
      },
    })
  })

  app.post('/recipies', async (req) => {
    const bodySchema = z.object({
      name: z.string(),
      ingredients: z.array(z.string()),
      instructions: z.string().nullable(),
      portionsQtd: z.number().nullable(),
      timeToCook: z.string().nullable(),
      mediaLinks: z.array(z.string()),
    })

    const {
      name,
      ingredients,
      instructions,
      portionsQtd,
      timeToCook,
      mediaLinks,
    } = bodySchema.parse(req.body)

    // res.code(201).send()
    return await prisma.recipe.create({
      data: {
        name,
        ingredients,
        instructions,
        portionsQtd,
        timeToCook,
        mediaLinks,
      },
    })
  })

  app.patch('/recipies/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      name: z.string(),
      ingredients: z.array(z.string()).optional(),
      instructions: z.string().nullable().optional(),
      portionsQtd: z.number().nullable().optional(),
      timeToCook: z.string().nullable().optional(),
      mediaLinks: z.array(z.string()).optional(),
    })

    const {
      name,
      ingredients,
      instructions,
      portionsQtd,
      timeToCook,
      mediaLinks,
    } = bodySchema.parse(req.body)
    // res.code(200).send()
    return await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        name,
        ingredients,
        instructions,
        portionsQtd,
        timeToCook,
        mediaLinks,
      },
    })
  })

  app.delete('/recipies/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    await prisma.recipe.delete({
      where: {
        id,
      },
    })

    res.code(204).send()
  })
}
