/*
  Warnings:

  - Added the required column `minor` to the `FormSPT` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "minor" AS ENUM ('GD2A', 'CIA', 'WMD', 'ITPM', 'DMM', 'TECHNOPRENEUR');

-- DropIndex
DROP INDEX "FormSPT_nik_key";

-- AlterTable
ALTER TABLE "FormSPT" ADD COLUMN     "minor" "minor" NOT NULL;
