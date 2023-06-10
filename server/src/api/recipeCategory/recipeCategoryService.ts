import { prisma } from '../../lib/prisma'
import {
  CreateRecipeCategoryInput,
  DeleteRecipeCategoryInput,
} from './recipeCategorySchema'

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

export async function create(data: CreateRecipeCategoryInput) {
  return await prisma.recipeCategory.create({
    data: {
      ...data,
    },
  })
}

export async function deleteById(data: DeleteRecipeCategoryInput) {
  await prisma.recipeCategory.deleteMany({
    where: {
      OR: {
        recipeId: data.recipeId,
        categoryId: data.categoryId,
      },
    },
  })
}
