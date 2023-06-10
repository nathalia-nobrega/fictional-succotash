import { prisma } from '../../lib/prisma'
import { CreateCategoryInput, UpdateCategoryInput } from './categorySchema'

export async function getAll(userId: string) {
  return await prisma.category.findMany({
    where: {
      userId,
    },
  })
}
export async function getById(userId: string, categorydId: number) {
  return await prisma.category.findUniqueOrThrow({
    where: {
      id_userId: {
        id: categorydId,
        userId,
      },
    },
  })
}
export async function create(data: CreateCategoryInput & { userId: string }) {
  return await prisma.category.create({
    data: {
      ...data,
    },
  })
}
export async function update(
  data: UpdateCategoryInput,
  userId: string,
  categoryId: number,
) {
  return await prisma.category.update({
    where: {
      id_userId: {
        id: categoryId,
        userId,
      },
    },
    data: {
      ...data,
    },
  })
}
export async function deleteById(userId: string, categoryId: number) {
  // going to remove this from here and add it to recipeCategoryService

  await prisma.recipeCategory.deleteMany({
    where: {
      categoryId,
    },
  })
  await prisma.category.delete({
    where: {
      id_userId: {
        id: categoryId,
        userId,
      },
    },
  })
}
