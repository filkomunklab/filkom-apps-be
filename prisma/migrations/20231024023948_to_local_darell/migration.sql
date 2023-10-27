/*
  Warnings:

  - You are about to drop the column `graduate_year` on the `FormSPT` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FormSPT" DROP COLUMN "graduate_year";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "graduate_year" TEXT;
