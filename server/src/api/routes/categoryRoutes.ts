import { FastifyInstance } from 'fastify'
import { CategoryController } from '../controllers/categoryController'
import { $ref } from '../schemas/categorySchema'

export async function categoryRoutes(app: FastifyInstance) {
  const categoryController = new CategoryController()
  app.get(
    '/',
    { schema: { response: { 200: $ref('categoriesResponseSchema') } } },
    categoryController.getAllCategories,
  )

  app.get(
    '/:id',
    { schema: { response: { 200: $ref('categoryResponseSchema') } } },
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
      },
    },
    categoryController.updateCategory,
  )

  app.delete('/:id', categoryController.deleteCategoryById)
}
