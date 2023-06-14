import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

// refactor in the future bc this is ugly as hell
export async function authRoute(app: FastifyInstance) {
  app.post('/token', async (req, res) => {
    const codeSchema = z.object({
      access_token: z.string(),
    })

    const { access_token } = codeSchema.parse(req.body)

    const userResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )

    const bodySchema = z.object({
      given_name: z.string(),
      family_name: z.string(),
      email: z.string().email(),
      picture: z.string().url(),
    })

    const { given_name, family_name, email, picture } = bodySchema.parse(
      userResponse.data,
    )

    let user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          firstName: given_name,
          lastName: family_name,
          email,
          imageURL: picture,
        },
      })
    }

    const token = app.jwt.sign(
      {
        name: `${user.firstName} ${user.lastName} `,
        picture: user.imageURL,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )
    return token
  })
}
