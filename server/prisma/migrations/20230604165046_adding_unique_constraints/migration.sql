/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,id]` on the table `RecipeList` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,id]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recipe_userId_id_key" ON "Recipe"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeList_userId_id_key" ON "RecipeList"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Todo_userId_id_key" ON "Todo"("userId", "id");
