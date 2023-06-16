import { FastifyInstance } from 'fastify'
import { CategoryController } from './categoryController'
import { $ref } from './categorySchema'
import { $ref as uRef } from '../user/userSchema'

export async function categoryRoutes(app: FastifyInstance) {
  const categoryController = new CategoryController()
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
  app.get(
    '/',
    {
      schema: {
        response: { 200: $ref('categoriesResponseSchema') },
      },
    },
    categoryController.getAllCategories,
  )

  app.get(
    '/:id',
    {
      schema: {
        response: { 200: $ref('categoryResponseSchema') },
        params: uRef('idSchema'),
      },
    },
    categoryController.getCategoryById,
  )

  app.post(
    '/',
    {
      schema: {
        body: $ref('createCategorySchema'),
        response: { 201: $ref('categoryResponseSchema') },
      },
    },
    categoryController.createCategory,
  )

  app.put(
    '/:id',
    {
      schema: {
        body: $ref('updateCategorySchema'),
        response: { 201: $ref('categoryResponseSchema') },
        params: uRef('idSchema'),
      },
    },
    categoryController.updateCategory,
  )

  app.delete(
    '/:id',
    { schema: { params: uRef('idSchema') } },
    categoryController.deleteCategoryById,
  )
}
