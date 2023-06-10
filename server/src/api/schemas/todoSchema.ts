import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const todoInput = {
  title: z.string(),
  isChecked: z.boolean().default(false),
  date: z.coerce.date().nullable(),
}

const updateTodoInput = {
  title: z.string().optional(),
  isChecked: z.boolean().optional(),
  date: z.coerce.date().optional(),
}

const todoGenerated = {
  id: z.number(),
}

const createTodoSchema = z.object({
  ...todoInput,
})

const updateTodoSchema = z.object({
  ...updateTodoInput,
})

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
