/*
  Warnings:

  - A unique constraint covering the columns `[nidn]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reg_num]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Major" AS ENUM ('SI', 'IF');

-- CreateEnum
CREATE TYPE "Thesis_Approve" AS ENUM ('Waiting', 'Approve', 'Rejected');

-- CreateEnum
CREATE TYPE "Submission_Approve" AS ENUM ('Waiting', 'Approve', 'Rejected');

-- CreateEnum
CREATE TYPE "Classroom_Name" AS ENUM ('Proposal', 'Skripsi');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('Ganjil', 'Genap', 'Padat');

-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('Submission', 'Proposal', 'Skripsi', 'Finished');

-- CreateEnum
CREATE TYPE "Exam_Conclution" AS ENUM ('Rejected', 'Approve');

-- CreateEnum
CREATE TYPE "Changes_Conclusion" AS ENUM ('Major', 'Minor');

-- CreateEnum
CREATE TYPE "Pass" AS ENUM ('Pass', 'Fail', 'Repeat');

-- CreateEnum
CREATE TYPE "Revision_Approve" AS ENUM ('Waiting', 'Approve', 'Rejected');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'DOSEN_MK';
ALTER TYPE "Role" ADD VALUE 'OPERATOR_FAKULTAS';

-- DropIndex
DROP INDEX "UserRole_userId_key";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "degree" TEXT,
ADD COLUMN     "major" "Major",
ADD COLUMN     "nidn" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "address" TEXT,
ADD COLUMN     "faculty" TEXT,
ADD COLUMN     "major" "Major",
ADD COLUMN     "reg_num" TEXT,
ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Proposal_Student" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "classroom_id" TEXT NOT NULL,

    CONSTRAINT "Proposal_Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skripsi_Student" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "classroom_id" TEXT,

    CONSTRAINT "Skripsi_Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group_Student" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "Group_Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "progress" "Progress",
    "title" TEXT,
    "keywords" TEXT,
    "abstrak" TEXT,
    "reference" TEXT,
    "submission_id" TEXT,
    "proposal_id" TEXT,
    "skripsi_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Academic_Calendar" (
    "id" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "Academic_Calendar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "dosen_mk_id" TEXT NOT NULL,
    "academic_id" TEXT NOT NULL,
    "name" "Classroom_Name" NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL,
    "file_size" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "is_consultation" BOOLEAN NOT NULL,
    "proposed_advisor_id" TEXT NOT NULL,
    "proposed_co_advisor1_id" TEXT,
    "proposed_co_advisor2_id" TEXT,
    "is_approve" "Submission_Approve" NOT NULL DEFAULT 'Waiting',
    "classroom_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "file_name_proposal" TEXT,
    "file_name_payment" TEXT,
    "file_name_plagiarismcheck" TEXT,
    "upload_date_proposal" TIMESTAMP(3),
    "upload_date_payment" TIMESTAMP(3),
    "upload_date_plagiarismcheck" TIMESTAMP(3),
    "file_size_proposal" TEXT,
    "file_size_payment" TEXT,
    "file_size_plagiarismcheck" TEXT,
    "file_path_proposal" TEXT,
    "file_path_payment" TEXT,
    "file_path_plagiarismcheck" TEXT,
    "advisor_id" TEXT NOT NULL,
    "co_advisor1_id" TEXT,
    "co_advisor2_id" TEXT,
    "classroom_id" TEXT NOT NULL,
    "is_proposal_approve_by_advisor" "Thesis_Approve",
    "is_proposal_approve_by_co_advisor1" "Thesis_Approve",
    "is_proposal_approve_by_co_advisor2" "Thesis_Approve",
    "advisor_proposal_approved_date" TIMESTAMP(3),
    "co_advisor1_proposal_approved_date" TIMESTAMP(3),
    "co_advisor2_proposal_approved_date" TIMESTAMP(3),
    "panelist_chairman_id" TEXT,
    "panelist_member_id" TEXT,
    "start_defence" TEXT,
    "end_defence" TEXT,
    "defence_room" TEXT,
    "defence_date" TEXT,
    "is_report_open" BOOLEAN NOT NULL DEFAULT false,
    "is_report_approve_by_dekan" BOOLEAN,
    "is_report_approve_by_panelist_chairman" BOOLEAN,
    "is_report_approve_by_panelist_member" BOOLEAN,
    "is_report_approve_by_advisor" BOOLEAN,
    "dekan_report_approve_date" TIMESTAMP(3),
    "panelist_chairman_report_approve_date" TIMESTAMP(3),
    "panelist_member_report_approve_date" TIMESTAMP(3),
    "advisor_report_approve_date" TIMESTAMP(3),
    "exam_conclution" "Exam_Conclution",
    "changes_conclusion" "Changes_Conclusion",
    "assessment_conclution" TEXT,
    "is_pass" "Pass",
    "report_date" TEXT,
    "file_name_revision" TEXT,
    "upload_date_revision" TIMESTAMP(3),
    "file_size_revision" TEXT,
    "file_path_revision" TEXT,
    "is_revision_approve_by_panelist_chairman" "Revision_Approve",
    "is_revision_approve_by_panelist_member" "Revision_Approve",
    "is_revision_approve_by_advisor" "Revision_Approve",
    "panelist_chairman_revision_approve_date" TIMESTAMP(3),
    "panelist_member_revision_approve_date" TIMESTAMP(3),
    "advisor_revision_approve_date" TIMESTAMP(3),

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skripsi" (
    "id" TEXT NOT NULL,
    "file_name_skripsi" TEXT,
    "file_name_payment" TEXT,
    "file_name_plagiarismcheck" TEXT,
    "upload_date_skripsi" TIMESTAMP(3),
    "upload_date_payment" TIMESTAMP(3),
    "upload_date_plagiarismcheck" TIMESTAMP(3),
    "file_size_skripsi" TEXT,
    "file_size_payment" TEXT,
    "file_size_plagiarismcheck" TEXT,
    "file_path_skripsi" TEXT,
    "file_path_payment" TEXT,
    "file_path_plagiarismcheck" TEXT,
    "advisor_id" TEXT NOT NULL,
    "co_advisor1_id" TEXT,
    "co_advisor2_id" TEXT,
    "classroom_id" TEXT,
    "is_skripsi_approve_by_advisor" "Thesis_Approve",
    "is_skripsi_approve_by_co_advisor1" "Thesis_Approve",
    "is_skripsi_approve_by_co_advisor2" "Thesis_Approve",
    "advisor_skripsi_approved_date" TIMESTAMP(3),
    "co_advisor1_skripsi_approved_date" TIMESTAMP(3),
    "co_advisor2_skripsi_approved_date" TIMESTAMP(3),
    "panelist_chairman_id" TEXT,
    "panelist_member_id" TEXT,
    "start_defence" TEXT,
    "end_defence" TEXT,
    "defence_room" TEXT,
    "defence_date" TEXT,
    "is_report_open" BOOLEAN NOT NULL DEFAULT false,
    "is_report_approve_by_dekan" BOOLEAN,
    "is_report_approve_by_panelist_chairman" BOOLEAN,
    "is_report_approve_by_panelist_member" BOOLEAN,
    "is_report_approve_by_advisor" BOOLEAN,
    "dekan_report_approve_date" TIMESTAMP(3),
    "panelist_chairman_report_approve_date" TIMESTAMP(3),
    "panelist_member_report_approve_date" TIMESTAMP(3),
    "advisor_report_approve_date" TIMESTAMP(3),
    "exam_conclution" "Exam_Conclution",
    "changes_conclusion" "Changes_Conclusion",
    "assessment_conclution" TEXT,
    "is_pass" "Pass",
    "report_date" TEXT,
    "file_name_revision" TEXT,
    "upload_date_revision" TIMESTAMP(3),
    "file_size_revision" TEXT,
    "file_path_revision" TEXT,
    "is_revision_approve_by_panelist_chairman" "Revision_Approve",
    "is_revision_approve_by_panelist_member" "Revision_Approve",
    "is_revision_approve_by_advisor" "Revision_Approve",
    "panelist_chairman_revision_approve_date" TIMESTAMP(3),
    "panelist_member_revision_approve_date" TIMESTAMP(3),
    "advisor_revision_approve_date" TIMESTAMP(3),
    "file_name_hki" TEXT,
    "file_name_journal" TEXT,
    "file_name_sourcecode" TEXT,
    "upload_date_hki" TIMESTAMP(3),
    "upload_date_journal" TIMESTAMP(3),
    "upload_date_sourcecode" TIMESTAMP(3),
    "file_size_hki" TEXT,
    "file_size_journal" TEXT,
    "file_size_sourcecode" TEXT,
    "link_soucecode" TEXT,
    "upload_date_link_soucecode" TIMESTAMP(3),
    "file_path_hki" TEXT,
    "file_path_journal" TEXT,
    "file_path_sourcecode" TEXT,

    CONSTRAINT "Skripsi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal_Assessment" (
    "id" TEXT NOT NULL,
    "proposal_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "Proposal_Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skripsi_Assessment" (
    "id" TEXT NOT NULL,
    "skripsi_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "Skripsi_Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal_Changes" (
    "id" TEXT NOT NULL,
    "proposal_id" TEXT NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "changes" TEXT,

    CONSTRAINT "Proposal_Changes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skripsi_Changes" (
    "id" TEXT NOT NULL,
    "skripsi_id" TEXT NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "changes" TEXT,

    CONSTRAINT "Skripsi_Changes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thesis_Consultation" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dosen_id" TEXT NOT NULL,

    CONSTRAINT "Thesis_Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thesis_History" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "group_id" TEXT NOT NULL,

    CONSTRAINT "Thesis_History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_submission_id_key" ON "Group"("submission_id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_proposal_id_key" ON "Group"("proposal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_skripsi_id_key" ON "Group"("skripsi_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_nidn_key" ON "Employee"("nidn");

-- CreateIndex
CREATE UNIQUE INDEX "Student_reg_num_key" ON "Student"("reg_num");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "Proposal_Student" ADD CONSTRAINT "Proposal_Student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal_Student" ADD CONSTRAINT "Proposal_Student_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Student" ADD CONSTRAINT "Skripsi_Student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Student" ADD CONSTRAINT "Skripsi_Student_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Student" ADD CONSTRAINT "Group_Student_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group_Student" ADD CONSTRAINT "Group_Student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "Proposal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_skripsi_id_fkey" FOREIGN KEY ("skripsi_id") REFERENCES "Skripsi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_dosen_mk_id_fkey" FOREIGN KEY ("dosen_mk_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_academic_id_fkey" FOREIGN KEY ("academic_id") REFERENCES "Academic_Calendar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_proposed_advisor_id_fkey" FOREIGN KEY ("proposed_advisor_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_proposed_co_advisor1_id_fkey" FOREIGN KEY ("proposed_co_advisor1_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_proposed_co_advisor2_id_fkey" FOREIGN KEY ("proposed_co_advisor2_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_co_advisor1_id_fkey" FOREIGN KEY ("co_advisor1_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_co_advisor2_id_fkey" FOREIGN KEY ("co_advisor2_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_panelist_chairman_id_fkey" FOREIGN KEY ("panelist_chairman_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_panelist_member_id_fkey" FOREIGN KEY ("panelist_member_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi" ADD CONSTRAINT "Skripsi_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi" ADD CONSTRAINT "Skripsi_co_advisor1_id_fkey" FOREIGN KEY ("co_advisor1_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi" ADD CONSTRAINT "Skripsi_co_advisor2_id_fkey" FOREIGN KEY ("co_advisor2_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi" ADD CONSTRAINT "Skripsi_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "Classroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi" ADD CONSTRAINT "Skripsi_panelist_chairman_id_fkey" FOREIGN KEY ("panelist_chairman_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi" ADD CONSTRAINT "Skripsi_panelist_member_id_fkey" FOREIGN KEY ("panelist_member_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal_Assessment" ADD CONSTRAINT "Proposal_Assessment_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal_Assessment" ADD CONSTRAINT "Proposal_Assessment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal_Assessment" ADD CONSTRAINT "Proposal_Assessment_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Assessment" ADD CONSTRAINT "Skripsi_Assessment_skripsi_id_fkey" FOREIGN KEY ("skripsi_id") REFERENCES "Skripsi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Assessment" ADD CONSTRAINT "Skripsi_Assessment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Assessment" ADD CONSTRAINT "Skripsi_Assessment_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal_Changes" ADD CONSTRAINT "Proposal_Changes_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal_Changes" ADD CONSTRAINT "Proposal_Changes_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Changes" ADD CONSTRAINT "Skripsi_Changes_skripsi_id_fkey" FOREIGN KEY ("skripsi_id") REFERENCES "Skripsi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Changes" ADD CONSTRAINT "Skripsi_Changes_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis_Consultation" ADD CONSTRAINT "Thesis_Consultation_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis_Consultation" ADD CONSTRAINT "Thesis_Consultation_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis_History" ADD CONSTRAINT "Thesis_History_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
