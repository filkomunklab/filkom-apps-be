/*
  Warnings:

  - You are about to drop the column `guardianPhone` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "guardianPhone",
ADD COLUMN     "guardianPhoneNo" TEXT;
