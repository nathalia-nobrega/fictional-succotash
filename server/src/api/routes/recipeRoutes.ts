import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { RecipeController } from '../controllers/recipeController'
import { prisma } from '../lib/prisma'

const recipeController = new RecipeController()

// TODO: Refactor route so that it satisfies OAuth logic
export async function recipeRoutes(app: FastifyInstance) {
  app.get('/', recipeController.getAllRecipies)

  app.get('/:id', recipeController.getRecipeById)

  app.post('/', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      name: z.string(),
      ingredients: z.array(z.string()),
      instructions: z.string().nullable(),
      portionsQtd: z.coerce.number().nullable(),
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
        userId,
      },
    })
  })

  app.put('/:id', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })
    const { userId, id } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      name: z.string().optional(),
      ingredients: z.array(z.string()).optional(),
      instructions: z.string().nullable().optional(),
      portionsQtd: z.coerce.number().nullable().optional(),
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
        userId_id: {
          userId,
          id,
        },
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

  app.delete('/:id', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramsSchema.parse(req.params)

    await prisma.recipe.delete({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
    })
  })
}
