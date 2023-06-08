import { prisma } from '../lib/prisma'
import { CreateTodoInput, UpdateTodoInput } from '../schemas/todoSchema'

export async function getAll(userId: string) {
  return await prisma.todo.findMany({
    where: {
      userId,
    },
  })
}
export async function getById(userId: string, todoId: number) {
  return await prisma.todo.findUniqueOrThrow({
    where: {
      userId_id: {
        id: todoId,
        userId,
      },
    },
  })
}
export async function create(data: CreateTodoInput & { userId: string }) {
  return await prisma.todo.create({
    data: {
      ...data,
    },
  })
}
export async function update(
  data: UpdateTodoInput,
  userId: string,
  todoId: number,
) {
  return await prisma.todo.update({
    where: {
      userId_id: {
        id: todoId,
        userId,
      },
    },
    data: {
      ...data,
    },
  })
}
export async function deleteById(userId: string, todoId: number) {
  await prisma.todo.delete({
    where: {
      userId_id: {
        id: todoId,
        userId,
      },
    },
  })
}
