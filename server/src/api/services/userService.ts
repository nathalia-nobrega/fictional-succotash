import { prisma } from '../lib/prisma'
import { CreateUserInput, UpdateUserInput } from '../schemas/userSchema'

export async function getAll() {
  return await prisma.user.findMany()
}

export async function getById(userId: string) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  })
}

export async function create(data: CreateUserInput) {
  return await prisma.user.create({
    data: {
      ...data,
    },
  })
}

export async function update(data: UpdateUserInput & { userId: string }) {
  return await prisma.user.update({
    where: {
      id: data.userId,
    },
    data: {
      ...data,
    },
  })
}

export async function deleteById(userId: string) {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  })
}
