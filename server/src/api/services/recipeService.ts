import { prisma } from '../lib/prisma'
import { CreateRecipeInput, UpdateRecipeInput } from '../schemas/recipeSchemas'

export async function getAll(userId: string) {
  return await prisma.recipe.findMany({
    where: {
      userId,
    },
  })
}

export async function getById(userId: string, recipeId: number) {
  return await prisma.recipe.findUniqueOrThrow({
    where: {
      userId_id: {
        userId,
        id: recipeId,
      },
    },
  })
}

export async function create(data: CreateRecipeInput & { userId: string }) {
  return await prisma.recipe.create({
    data: {
      ...data,
    },
  })
}

export async function update(
  data: UpdateRecipeInput,
  userId: string,
  recipeId: number,
) {
  return await prisma.recipe.update({
    where: {
      userId_id: {
        userId,
        id: recipeId,
      },
    },
    data: {
      ...data,
    },
  })
}

export async function deleteById(userId: string, recipeId: number) {
  // going to remove this from here and add it to recipeCategoryService

  await prisma.recipeCategory.deleteMany({
    where: {
      recipeId,
    },
  })

  await prisma.recipe.delete({
    where: {
      userId_id: {
        userId,
        id: recipeId,
      },
    },
  })
}
