import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

// TODO: Refactor route so that it satisfies OAuth logic
export async function userRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    return await prisma.user.findMany
  })

  app.get('/users/:id', async (req) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)
    return await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    })
  })

  app.post('/users', async (req, res) => {
    const bodySchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      birthDate: z.coerce.date(),
      email: z.string().email(),
      imageURL: z.string().url(),
    })

    const { firstName, lastName, birthDate, email, imageURL } =
      bodySchema.parse(req.body)

    // res.code(201).send()
    return await prisma.user.create({
      data: {
        firstName,
        lastName,
        birthDate,
        email,
        imageURL,
      },
    })
  })

  app.delete('/users/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    await prisma.user.delete({
      where: {
        id,
      },
    })

    res.code(204).send()
  })
}
