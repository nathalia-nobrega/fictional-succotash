-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "recipeListId" TEXT;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "RecipeList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "RecipeList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_recipeListId_fkey" FOREIGN KEY ("recipeListId") REFERENCES "RecipeList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeList" ADD CONSTRAINT "RecipeList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
