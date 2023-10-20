/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNum]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firstName,lastName]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentEmail]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[personalEmail]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firstName,lastName]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Address` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNum` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('GRADUATE', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('WAITING', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SEKRETARIS';

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phoneNum" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "currentAdresss" TEXT,
ADD COLUMN     "curriculum" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "employeeId" TEXT,
ADD COLUMN     "gender" "gender" NOT NULL,
ADD COLUMN     "highSchoolGrad" TEXT,
ADD COLUMN     "marriageStatus" TEXT,
ADD COLUMN     "personalEmail" TEXT,
ADD COLUMN     "religion" TEXT,
ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "studentEmail" TEXT,
ADD COLUMN     "studentGuardianId" TEXT;

-- CreateTable
CREATE TABLE "FormSPT" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "birth_mother" TEXT NOT NULL,
    "graduate_plan" TEXT NOT NULL,
    "minor" TEXT,
    "remaining_credits" TEXT NOT NULL,
    "remaining_classes" TEXT NOT NULL,
    "approvalFak" "status" NOT NULL DEFAULT 'WAITING',
    "approvalReg" "status" NOT NULL DEFAULT 'WAITING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "studentId" TEXT NOT NULL,

    CONSTRAINT "FormSPT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentGuardian" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "edicationLevel" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "familyRelation" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "StudentGuardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "sub_code" TEXT NOT NULL,
    "sub_name" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "preRequisite" TEXT NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreRegistration" (
    "id" TEXT NOT NULL,
    "submitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approveDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "subjectId" TEXT,
    "employeeId" TEXT,
    "studentId" TEXT,

    CONSTRAINT "PreRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "submitDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "DosenId" TEXT,
    "employeeId" TEXT,
    "studentId" TEXT,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT,
    "sendTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT,
    "employeeId" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "submitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "certificateId" TEXT,
    "activityId" TEXT,
    "studentId" TEXT,
    "employeeId" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryAcademic" (
    "id" TEXT NOT NULL,
    "preRegistrationId" TEXT,
    "consultationId" TEXT,
    "certificateId" TEXT,
    "activityId" TEXT,

    CONSTRAINT "HistoryAcademic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormSPT_nik_key" ON "FormSPT"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phoneNum_key" ON "Employee"("phoneNum");

-- CreateIndex
CREATE INDEX "Employee_email_idx" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_firstName_lastName_key" ON "Employee"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentEmail_key" ON "Student"("studentEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Student_personalEmail_key" ON "Student"("personalEmail");

-- CreateIndex
CREATE INDEX "Student_studentEmail_personalEmail_idx" ON "Student"("studentEmail", "personalEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Student_firstName_lastName_key" ON "Student"("firstName", "lastName");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentGuardianId_fkey" FOREIGN KEY ("studentGuardianId") REFERENCES "StudentGuardian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSPT" ADD CONSTRAINT "FormSPT_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreRegistration" ADD CONSTRAINT "PreRegistration_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreRegistration" ADD CONSTRAINT "PreRegistration_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreRegistration" ADD CONSTRAINT "PreRegistration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_DosenId_fkey" FOREIGN KEY ("DosenId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryAcademic" ADD CONSTRAINT "HistoryAcademic_preRegistrationId_fkey" FOREIGN KEY ("preRegistrationId") REFERENCES "PreRegistration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryAcademic" ADD CONSTRAINT "HistoryAcademic_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryAcademic" ADD CONSTRAINT "HistoryAcademic_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryAcademic" ADD CONSTRAINT "HistoryAcademic_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
