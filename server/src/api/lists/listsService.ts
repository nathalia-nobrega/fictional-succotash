import { prisma } from '../../lib/prisma'
import { CreateListInput, DeleteListInput } from './listsSchema'

export async function getAll() {
  return await prisma.recipeCategory.findMany()
}

export async function getById(recipeId: number, categoryId: number) {
  return await prisma.recipeCategory.findUniqueOrThrow({
    where: {
      recipeId_categoryId: {
        recipeId,
        categoryId,
      },
    },
  })
}

export async function create(data: CreateListInput) {
  return await prisma.recipeCategory.create({
    data: {
      ...data,
    },
  })
}

export async function deleteById(data: DeleteListInput) {
  await prisma.recipeCategory.deleteMany({
    where: {
      OR: {
        recipeId: data.recipeId,
        categoryId: data.categoryId,
      },
    },
  })
}
