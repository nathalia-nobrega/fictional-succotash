/*
  Warnings:

  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recipeListId` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `RecipeList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `RecipeList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_recipeListId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "recipeListId",
ADD COLUMN     "recipeListId" INTEGER,
ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RecipeList" DROP CONSTRAINT "RecipeList_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "RecipeList_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Todo_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_userId_id_key" ON "Recipe"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeList_userId_id_key" ON "RecipeList"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Todo_userId_id_key" ON "Todo"("userId", "id");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_recipeListId_fkey" FOREIGN KEY ("recipeListId") REFERENCES "RecipeList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
