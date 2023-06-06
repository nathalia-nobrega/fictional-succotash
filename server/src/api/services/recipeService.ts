import { Recipe } from '../../types/Recipe'
import { prisma } from '../lib/prisma'

export const getAll = async (userId: string) => {
  return await prisma.recipe.findMany({
    where: {
      userId,
    },
  })
}

export const getById = async (userId: string, id: number) => {
  return await prisma.recipe.findUniqueOrThrow({
    where: {
      userId_id: {
        userId,
        id,
      },
    },
  })
}
// TODO: Implement create
// export const create = async (recipe: Recipe) => {}
