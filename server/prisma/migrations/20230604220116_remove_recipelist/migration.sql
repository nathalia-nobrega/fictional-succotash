/*
  Warnings:

  - You are about to drop the column `recipeListId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `RecipeList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_recipeListId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeList" DROP CONSTRAINT "RecipeList_userId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "recipeListId";

-- DropTable
DROP TABLE "RecipeList";
