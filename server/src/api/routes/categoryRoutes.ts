import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function categoryRoutes(app: FastifyInstance) {
  app.get('/', async (req) => {
    const paramSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramSchema.parse(req.params)

    return await prisma.category.findMany({
      where: {
        userId,
      },
    })
  })

  app.get('/:id', async (req) => {
    const paramSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramSchema.parse(req.params)

    return await prisma.category.findUniqueOrThrow({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
    })
  })

  app.post('/', async (req) => {
    const paramSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramSchema.parse(req.params)

    const bodySchema = z.object({
      title: z.string(),
    })

    const { title } = bodySchema.parse(req.body)

    return await prisma.category.create({
      data: {
        title,
        userId,
      },
    })
  })

  app.put('/:id', async (req, res) => {
    const paramSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramSchema.parse(req.params)

    const bodySchema = z.object({
      title: z.string(),
    })

    const { title } = bodySchema.parse(req.body)

    return await prisma.category.update({
      where: {
        id_userId: {
          userId,
          id,
        },
      },
      data: {
        title,
      },
    })
  })

  app.delete('/:id', async (req) => {
    const paramSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramSchema.parse(req.params)

    await prisma.category.delete({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
    })
  })
}
