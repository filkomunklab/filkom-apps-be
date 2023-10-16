/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "token" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_token_key" ON "Employee"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Student_token_key" ON "Student"("token");
