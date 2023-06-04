-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "date" DATE,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
