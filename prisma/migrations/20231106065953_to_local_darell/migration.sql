/*
  Warnings:

  - You are about to drop the column `consultationId` on the `HistoryAcademic` table. All the data in the column will be lost.
  - You are about to drop the column `consultationId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Consultation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_DosenId_fkey";

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_studentId_fkey";

-- DropForeignKey
ALTER TABLE "HistoryAcademic" DROP CONSTRAINT "HistoryAcademic_consultationId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_consultationId_fkey";

-- AlterTable
ALTER TABLE "HistoryAcademic" DROP COLUMN "consultationId",
ADD COLUMN     "academicConsultationId" TEXT;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "consultationId",
ADD COLUMN     "academicConsultationId" TEXT;

-- DropTable
DROP TABLE "Consultation";

-- CreateTable
CREATE TABLE "Academic_Consultation" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "submitDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "DosenId" TEXT,
    "employeeId" TEXT,
    "studentId" TEXT,

    CONSTRAINT "Academic_Consultation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Academic_Consultation" ADD CONSTRAINT "Academic_Consultation_DosenId_fkey" FOREIGN KEY ("DosenId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Academic_Consultation" ADD CONSTRAINT "Academic_Consultation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Academic_Consultation" ADD CONSTRAINT "Academic_Consultation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_academicConsultationId_fkey" FOREIGN KEY ("academicConsultationId") REFERENCES "Academic_Consultation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryAcademic" ADD CONSTRAINT "HistoryAcademic_academicConsultationId_fkey" FOREIGN KEY ("academicConsultationId") REFERENCES "Academic_Consultation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
