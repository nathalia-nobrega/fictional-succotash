/*
  Warnings:

  - You are about to drop the `RecipeCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecipeCategory" DROP CONSTRAINT "RecipeCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeCategory" DROP CONSTRAINT "RecipeCategory_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "categoryId" INTEGER;

-- DropTable
DROP TABLE "RecipeCategory";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
