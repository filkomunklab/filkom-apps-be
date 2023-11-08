/*
  Warnings:

  - You are about to drop the column `studentGuardianId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_studentGuardianId_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "studentGuardianId" TEXT;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "studentGuardianId";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentGuardianId_fkey" FOREIGN KEY ("studentGuardianId") REFERENCES "StudentGuardian"("id") ON DELETE SET NULL ON UPDATE CASCADE;
