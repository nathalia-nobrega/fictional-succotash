import { Prisma } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateListInput, DeleteListInput } from './listsSchema'
import {
  create,
  deleteById,
  exeqRawQuery,
  getAll,
  getById,
} from './listsService'
import { CategoryIdInput } from '../category/categorySchema'

export class RecipeCategoryCategoryController {
  async getAllRecipiesCategories(req: FastifyRequest, res: FastifyReply) {
    return getAll()
  }

  async getRecipeCategoryById(
    req: FastifyRequest<{ Params: CreateListInput }>,
    res: FastifyReply,
  ) {
    const { recipeId, categoryId } = { ...req.params }

    return getById(recipeId, categoryId)
  }

  async createRecipeCategory(
    req: FastifyRequest<{ Body: CreateListInput }>,
    res: FastifyReply,
  ) {
    const data = { ...req.body }
    res.code(201)
    return create(data)
  }

  async deleteRecipeCategory(
    req: FastifyRequest<{ Body: DeleteListInput }>,
    res: FastifyReply,
  ) {
    const data = { ...req.body }
    res.code(204)
    deleteById(data)
  }

  async getAllRecipiesCategoriesExpanded(
    req: FastifyRequest<{ Params: CategoryIdInput }>,
    res: FastifyReply,
  ) {
    const categoryId = req.params.categoryId
    const sql = Prisma.raw(`SELECT "Recipe"."name", "Category".title
    FROM "Recipe"
    JOIN "RecipeCategory" ON "RecipeCategory"."recipeId" = "Recipe".id
    JOIN "Category" ON "Category".id = "RecipeCategory"."categoryId"
    WHERE "Category".id = ${categoryId}`)
    return exeqRawQuery(sql)
  }

  async getCategoriesCountByRecipe(req: FastifyRequest, res: FastifyReply) {
    const sql =
      Prisma.raw(`SELECT count("Category".id), "Category".title, "Category".id
      FROM "Category"
      JOIN "RecipeCategory" ON "RecipeCategory"."categoryId" = "Category".id
    WHERE "RecipeCategory"."categoryId" = "Category".id
    GROUP BY "Category".title, "Category".id
`)
    return exeqRawQuery(sql)
  }
}
