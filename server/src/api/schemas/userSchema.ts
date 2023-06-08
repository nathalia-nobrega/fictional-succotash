import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const createUserInput = {
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.coerce.date(),
  email: z.string().email(),
  imageURL: z.string().url(),
}

const updateUserInput = {
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  email: z.string().email().optional(),
  imageURL: z.string().url().optional(),
}

const userGenerated = {
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
}

const createUserSchema = z.object({
  ...createUserInput,
})
const updateUserSchema = z.object({
  ...updateUserInput,
})

const userResponseSchema = z.object({
  ...createUserInput,
  ...userGenerated,
})
const usersResponseSchema = z.array(userResponseSchema)

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>

export const { schemas: userSchema, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    updateUserSchema,
    userResponseSchema,
    usersResponseSchema,
  },
  { $id: 'userSchemaID' },
)
