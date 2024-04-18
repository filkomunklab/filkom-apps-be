/*
  Warnings:

  - You are about to alter the column `score` on the `StudentGrade` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "StudentGrade" ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION;
