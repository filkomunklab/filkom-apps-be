/*
  Warnings:

  - You are about to drop the column `edicationLevel` on the `StudentGuardian` table. All the data in the column will be lost.
  - Added the required column `educationLevel` to the `StudentGuardian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marriageStatus` to the `StudentGuardian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentGuardian" DROP COLUMN "edicationLevel",
ADD COLUMN     "educationLevel" TEXT NOT NULL,
ADD COLUMN     "marriageStatus" TEXT NOT NULL;
