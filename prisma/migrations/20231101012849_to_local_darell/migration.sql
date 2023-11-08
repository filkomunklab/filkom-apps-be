/*
  Warnings:

  - You are about to drop the column `studentGuardianId` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_studentGuardianId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "studentGuardianId";

-- AlterTable
ALTER TABLE "StudentGuardian" ADD COLUMN     "studentId" TEXT;

-- AddForeignKey
ALTER TABLE "StudentGuardian" ADD CONSTRAINT "StudentGuardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("nim") ON DELETE SET NULL ON UPDATE CASCADE;
