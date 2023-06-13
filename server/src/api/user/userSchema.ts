import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const createUserInput = {
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  imageURL: z.string().url(),
}

const updateUserInput = {
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  imageURL: z.string().url(),
}

const userIdParamsInput = {
  userId: z.string().uuid(),
}
const idParamsInput = {
  id: z.number(),
  userId: z.string().uuid(),
}

const userGenerated = {
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
}

const createUserSchema = z.object({
  ...createUserInput,
})
const updateUserSchema = z
  .object({
    ...updateUserInput,
  })
  .partial()
const idSchema = z.object({
  ...idParamsInput,
})
const userIdSchema = z.object({
  ...userIdParamsInput,
})

const userResponseSchema = z.object({
  ...createUserInput,
  ...userGenerated,
})
const usersResponseSchema = z.array(userResponseSchema)

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type UserIdParamsInput = z.infer<typeof userIdSchema>
export type IdParamsInput = z.infer<typeof idSchema>

export const { schemas: userSchema, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    updateUserSchema,
    userResponseSchema,
    usersResponseSchema,
    userIdSchema,
    idSchema,
  },
  { $id: 'userSchemaID' },
)
