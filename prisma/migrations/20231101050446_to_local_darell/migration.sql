/*
  Warnings:

  - You are about to drop the column `studentGuardianId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `StudentGuardian` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_studentGuardianId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "studentGuardianId",
ADD COLUMN     "familyRelation" TEXT,
ADD COLUMN     "guardianAddress" TEXT,
ADD COLUMN     "guardianEducation" TEXT,
ADD COLUMN     "guardianEmail" TEXT,
ADD COLUMN     "guardianName" TEXT,
ADD COLUMN     "guardianPhone" TEXT,
ADD COLUMN     "guardianReligion" TEXT,
ADD COLUMN     "guardianStatus" TEXT;

-- DropTable
DROP TABLE "StudentGuardian";
