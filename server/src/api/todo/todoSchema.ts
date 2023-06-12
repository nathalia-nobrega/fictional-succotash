import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const todoInput = {
  title: z.string().trim().min(1),
  isChecked: z.boolean().default(false),
  date: z.coerce.date().nullable(),
}

const updateTodoInput = {
  title: z.string(),
  isChecked: z.boolean(),
  date: z.coerce.date(),
}
const todoGenerated = {
  id: z.number(),
  updatedAt: z.coerce.date(),
}

const createTodoSchema = z.object({
  ...todoInput,
})

const updateTodoSchema = z
  .object({
    ...updateTodoInput,
  })
  .partial()

const todoResponseSchema = z.object({
  ...todoInput,
  ...todoGenerated,
})
const todosResponseSchema = z.array(todoResponseSchema)

export type CreateTodoInput = z.infer<typeof createTodoSchema>
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>

export const { schemas: todoSchema, $ref } = buildJsonSchemas(
  {
    createTodoSchema,
    updateTodoSchema,
    todoResponseSchema,
    todosResponseSchema,
  },
  { $id: 'todoSchemaID' },
)
