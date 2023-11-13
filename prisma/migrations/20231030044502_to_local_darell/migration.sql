/*
  Warnings:

  - You are about to drop the column `studentGuardianId` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_studentGuardianId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "studentGuardianId";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "studentGuardianId" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_studentGuardianId_fkey" FOREIGN KEY ("studentGuardianId") REFERENCES "StudentGuardian"("id") ON DELETE SET NULL ON UPDATE CASCADE;
