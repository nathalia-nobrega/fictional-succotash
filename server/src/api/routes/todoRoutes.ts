import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

// TODO: Remove :id from the URL params to satisfy the logic with OAuth
export async function todoRoutes(app: FastifyInstance) {
  app.get('/users/:userId/todos', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(req.params)

    return await prisma.todo.findMany({
      where: {
        userId,
      },
    })
  })

  app.get('/users/:userId/todos/:id', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramsSchema.parse(req.params)

    return await prisma.todo.findUniqueOrThrow({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
    })
  })

  app.post('/users/:userId/todos', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      title: z.string(),
      isChecked: z.boolean().default(false),
      date: z.coerce.date().nullable(),
    })

    const { title, isChecked, date } = bodySchema.parse(req.body)

    return await prisma.todo.create({
      data: {
        title,
        isChecked,
        date,
        userId,
      },
    })
  })

  app.put('/users/:userId/todos/:id', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })
    const { userId, id } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      title: z.string().optional(),
      isChecked: z.boolean().optional(),
      date: z.coerce.date().optional(),
    })

    const { title, isChecked, date } = bodySchema.parse(req.body)

    return await prisma.todo.update({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
      data: {
        title,
        isChecked,
        date,
      },
    })
  })

  app.delete('/users/:userId/todos/:id', async (req) => {
    const paramsSchema = z.object({
      userId: z.string().uuid(),
      id: z.coerce.number(),
    })

    const { userId, id } = paramsSchema.parse(req.params)

    await prisma.todo.delete({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
    })
  })
}
