/*
  Warnings:

  - You are about to drop the column `studentId` on the `StudentGuardian` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentGuardian" DROP CONSTRAINT "StudentGuardian_studentId_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "studentGuardianId" TEXT;

-- AlterTable
ALTER TABLE "StudentGuardian" DROP COLUMN "studentId";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentGuardianId_fkey" FOREIGN KEY ("studentGuardianId") REFERENCES "StudentGuardian"("id") ON DELETE SET NULL ON UPDATE CASCADE;
