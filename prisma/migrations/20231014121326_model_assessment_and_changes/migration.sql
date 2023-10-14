/*
  Warnings:

  - You are about to drop the column `changes_by_advisor` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `changes_by_co_advisor1` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `changes_by_co_advisor2` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `changes_by_panelist_chairman` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `changes_by_panelist_member` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student1_assessment_by_advisor` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student1_assessment_by_panelist_chairman` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student1_assessment_by_panelist_member` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student2_assessment_by_advisor` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student2_assessment_by_panelist_chairman` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student2_assessment_by_panelist_member` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student3_assessment_by_advisor` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student3_assessment_by_panelist_chairman` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student3_assessment_by_panelist_member` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student4_assessment_by_advisor` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student4_assessment_by_panelist_chairman` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `student4_assessment_by_panelist_member` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `changes_by_advisor` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `changes_by_co_advisor1` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `changes_by_co_advisor2` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `changes_by_panelist_chairman` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `changes_by_panelist_member` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student1_assessment_by_advisor` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student1_assessment_by_panelist_chairman` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student1_assessment_by_panelist_member` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student2_assessment_by_advisor` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student2_assessment_by_panelist_chairman` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student2_assessment_by_panelist_member` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student3_assessment_by_advisor` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student3_assessment_by_panelist_chairman` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student3_assessment_by_panelist_member` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student4_assessment_by_advisor` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student4_assessment_by_panelist_chairman` on the `Skripsi` table. All the data in the column will be lost.
  - You are about to drop the column `student4_assessment_by_panelist_member` on the `Skripsi` table. All the data in the column will be lost.
  - Made the column `is_report_open` on table `Proposal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_report_open` on table `Skripsi` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Changes_Conclusion" AS ENUM ('Major', 'Minor');

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "changes_by_advisor",
DROP COLUMN "changes_by_co_advisor1",
DROP COLUMN "changes_by_co_advisor2",
DROP COLUMN "changes_by_panelist_chairman",
DROP COLUMN "changes_by_panelist_member",
DROP COLUMN "student1_assessment_by_advisor",
DROP COLUMN "student1_assessment_by_panelist_chairman",
DROP COLUMN "student1_assessment_by_panelist_member",
DROP COLUMN "student2_assessment_by_advisor",
DROP COLUMN "student2_assessment_by_panelist_chairman",
DROP COLUMN "student2_assessment_by_panelist_member",
DROP COLUMN "student3_assessment_by_advisor",
DROP COLUMN "student3_assessment_by_panelist_chairman",
DROP COLUMN "student3_assessment_by_panelist_member",
DROP COLUMN "student4_assessment_by_advisor",
DROP COLUMN "student4_assessment_by_panelist_chairman",
DROP COLUMN "student4_assessment_by_panelist_member",
ADD COLUMN     "changes_conclusion" "Changes_Conclusion",
ALTER COLUMN "is_report_open" SET NOT NULL,
ALTER COLUMN "is_report_open" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Skripsi" DROP COLUMN "changes_by_advisor",
DROP COLUMN "changes_by_co_advisor1",
DROP COLUMN "changes_by_co_advisor2",
DROP COLUMN "changes_by_panelist_chairman",
DROP COLUMN "changes_by_panelist_member",
DROP COLUMN "student1_assessment_by_advisor",
DROP COLUMN "student1_assessment_by_panelist_chairman",
DROP COLUMN "student1_assessment_by_panelist_member",
DROP COLUMN "student2_assessment_by_advisor",
DROP COLUMN "student2_assessment_by_panelist_chairman",
DROP COLUMN "student2_assessment_by_panelist_member",
DROP COLUMN "student3_assessment_by_advisor",
DROP COLUMN "student3_assessment_by_panelist_chairman",
DROP COLUMN "student3_assessment_by_panelist_member",
DROP COLUMN "student4_assessment_by_advisor",
DROP COLUMN "student4_assessment_by_panelist_chairman",
DROP COLUMN "student4_assessment_by_panelist_member",
ADD COLUMN     "changes_conclusion" "Changes_Conclusion",
ALTER COLUMN "is_report_open" SET NOT NULL,
ALTER COLUMN "is_report_open" SET DEFAULT false;

-- CreateTable
CREATE TABLE "proposal_assessment" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "proposal_assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skripsi_assessment" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "skripsi_assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposal_changes" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "changes" TEXT NOT NULL,

    CONSTRAINT "proposal_changes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skripsi_changes" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "changes" TEXT NOT NULL,

    CONSTRAINT "skripsi_changes_pkey" PRIMARY KEY ("id")
);
