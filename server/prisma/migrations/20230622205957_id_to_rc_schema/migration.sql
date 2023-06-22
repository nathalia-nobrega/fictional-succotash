/*
  Warnings:

  - The primary key for the `RecipeCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "RecipeCategory" DROP CONSTRAINT "RecipeCategory_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "RecipeCategory_pkey" PRIMARY KEY ("id");
