/*
  Warnings:

  - A unique constraint covering the columns `[nidn]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reg_num]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "nidn" TEXT;

-- AlterTable
ALTER TABLE "Proposal" ALTER COLUMN "upload_date_revision" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Skripsi" ALTER COLUMN "classroom_id" DROP NOT NULL,
ALTER COLUMN "upload_date_revision" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_nidn_key" ON "Employee"("nidn");

-- CreateIndex
CREATE UNIQUE INDEX "Student_reg_num_key" ON "Student"("reg_num");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
