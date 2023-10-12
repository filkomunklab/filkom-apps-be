/*
  Warnings:

  - Added the required column `address` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('Submission', 'Proposal', 'Skripsi');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('Ganjil', 'Genap', 'Padat');

-- CreateEnum
CREATE TYPE "Submission_Approve" AS ENUM ('Waiting', 'Approve', 'Rejected');

-- CreateEnum
CREATE TYPE "Thesis_Approve" AS ENUM ('Waiting', 'Approve', 'Rejected');

-- CreateEnum
CREATE TYPE "Exam_Conclution" AS ENUM ('Rejected', 'Approve');

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

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "degree" TEXT,
ADD COLUMN     "prodi" TEXT;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "faculty" TEXT NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Thesis_Student" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,

    CONSTRAINT "Thesis_Student_pkey" PRIMARY KEY ("id")
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

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" TEXT NOT NULL,
    "is_consultation" BOOLEAN NOT NULL,
    "proposed_advisor" TEXT NOT NULL,
    "proposed_co_advisor1" TEXT,
    "proposed_co_advisor2" TEXT,
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
    "advisor" TEXT NOT NULL,
    "co_advisor1" TEXT,
    "co_advisor2" TEXT,
    "classroom_id" TEXT NOT NULL,
    "is_proposal_approve_by_advisor" "Thesis_Approve",
    "is_proposal_approve_by_co_advisor1" "Thesis_Approve",
    "is_proposal_approve_by_co_advisor2" "Thesis_Approve",
    "advisor_proposal_approved_date" TIMESTAMP(3),
    "co_advisor1_proposal_approved_date" TIMESTAMP(3),
    "co_advisor2_proposal_approved_date" TIMESTAMP(3),
    "panelist_chairman" TEXT,
    "panelist_member" TEXT,
    "start_defence" TEXT,
    "end_defence" TEXT,
    "defence_room" TEXT,
    "defence_date" TEXT,
    "is_report_open" BOOLEAN,
    "student1_assessment_by_panelist_chairman" TEXT,
    "student2_assessment_by_panelist_chairman" TEXT,
    "student3_assessment_by_panelist_chairman" TEXT,
    "student4_assessment_by_panelist_chairman" TEXT,
    "student1_assessment_by_panelist_member" TEXT,
    "student2_assessment_by_panelist_member" TEXT,
    "student3_assessment_by_panelist_member" TEXT,
    "student4_assessment_by_panelist_member" TEXT,
    "student1_assessment_by_advisor" TEXT,
    "student2_assessment_by_advisor" TEXT,
    "student3_assessment_by_advisor" TEXT,
    "student4_assessment_by_advisor" TEXT,
    "changes_by_panelist_chairman" TEXT,
    "changes_by_panelist_member" TEXT,
    "changes_by_advisor" TEXT,
    "changes_by_co_advisor1" TEXT,
    "changes_by_co_advisor2" TEXT,
    "is_report_approve_by_dekan" BOOLEAN,
    "is_report_approve_by_panelist_chairman" BOOLEAN,
    "is_report_approve_by_panelist_member" BOOLEAN,
    "is_report_approve_by_advisor" BOOLEAN,
    "exam_conclution" "Exam_Conclution",
    "assessment_conclution" TEXT,
    "is_pass" "Pass",
    "report_date" TIMESTAMP(3),
    "file_name_revision" TEXT,
    "upload_date_revision" TIMESTAMP(3) NOT NULL,
    "file_size_revision" TEXT,
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
    "advisor" TEXT NOT NULL,
    "co_advisor1" TEXT,
    "co_advisor2" TEXT,
    "classroom_id" TEXT NOT NULL,
    "is_skripsi_approve_by_advisor" "Thesis_Approve",
    "is_skripsi_approve_by_co_advisor1" "Thesis_Approve",
    "is_skripsi_approve_by_co_advisor2" "Thesis_Approve",
    "advisor_skripsi_approved_date" TIMESTAMP(3),
    "co_advisor1_skripsi_approved_date" TIMESTAMP(3),
    "co_advisor2_skripsi_approved_date" TIMESTAMP(3),
    "panelist_chairman" TEXT,
    "panelist_member" TEXT,
    "start_defence" TEXT,
    "end_defence" TEXT,
    "defence_room" TEXT,
    "defence_date" TEXT,
    "is_report_open" BOOLEAN,
    "student1_assessment_by_panelist_chairman" TEXT,
    "student2_assessment_by_panelist_chairman" TEXT,
    "student3_assessment_by_panelist_chairman" TEXT,
    "student4_assessment_by_panelist_chairman" TEXT,
    "student1_assessment_by_panelist_member" TEXT,
    "student2_assessment_by_panelist_member" TEXT,
    "student3_assessment_by_panelist_member" TEXT,
    "student4_assessment_by_panelist_member" TEXT,
    "student1_assessment_by_advisor" TEXT,
    "student2_assessment_by_advisor" TEXT,
    "student3_assessment_by_advisor" TEXT,
    "student4_assessment_by_advisor" TEXT,
    "changes_by_panelist_chairman" TEXT,
    "changes_by_panelist_member" TEXT,
    "changes_by_advisor" TEXT,
    "changes_by_co_advisor1" TEXT,
    "changes_by_co_advisor2" TEXT,
    "is_report_approve_by_dekan" BOOLEAN,
    "is_report_approve_by_panelist_chairman" BOOLEAN,
    "is_report_approve_by_panelist_member" BOOLEAN,
    "is_report_approve_by_advisor" BOOLEAN,
    "exam_conclution" "Exam_Conclution",
    "assessment_conclution" TEXT,
    "is_pass" "Pass",
    "report_date" TIMESTAMP(3),
    "file_name_revision" TEXT,
    "upload_date_revision" TIMESTAMP(3) NOT NULL,
    "file_size_revision" TEXT,
    "is_revision_approve_by_panelist_chairman" "Revision_Approve",
    "is_revision_approve_by_panelist_member" "Revision_Approve",
    "is_revision_approve_by_advisor" "Revision_Approve",
    "panelist_chairman_revision_approve_date" TIMESTAMP(3),
    "panelist_member_revision_approve_date" TIMESTAMP(3),
    "advisor_revision_approve_date" TIMESTAMP(3),
    "file_name_hki" TEXT,
    "file_name_journal" TEXT,
    "file_name_sourcecode" TEXT,
    "file_name_poster" TEXT,
    "file_name_tutorial" TEXT,
    "upload_date_hki" TIMESTAMP(3),
    "upload_date_journal" TIMESTAMP(3),
    "upload_date_sourcecode" TIMESTAMP(3),
    "upload_date_poster" TIMESTAMP(3),
    "upload_date_tutorial" TIMESTAMP(3),
    "file_size_hki" TEXT,
    "file_size_journal" TEXT,
    "file_size_sourcecode" TEXT,
    "link_soucecode" TEXT,
    "file_size_poster" TEXT,
    "file_size_tutorial" TEXT,

    CONSTRAINT "Skripsi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultaion" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consultaion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "group_id" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Thesis_Student_fullname_key" ON "Thesis_Student"("fullname");

-- CreateIndex
CREATE UNIQUE INDEX "Group_submission_id_key" ON "Group"("submission_id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_proposal_id_key" ON "Group"("proposal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_skripsi_id_key" ON "Group"("skripsi_id");
