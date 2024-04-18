/*
  Warnings:

  - You are about to drop the column `degree` on the `AKAD_Lecturer` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Major" ADD VALUE 'TI';

-- AlterTable
ALTER TABLE "AKAD_Lecturer" DROP COLUMN "degree";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "email" DROP NOT NULL;
