-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Major" AS ENUM ('SI', 'IF', 'DKV', 'NONE');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('GRADUATE', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('MALE', 'FEMALE');

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
CREATE TYPE "Consultation_Status" AS ENUM ('Proposal', 'Skripsi');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('WAITING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPER_ADMIN', 'MAHASISWA', 'ADMIN_LPMI', 'OPERATOR_LPMI', 'ALUMNI', 'DEKAN', 'KAPRODI', 'DOSEN', 'DOSEN_MK', 'OPERATOR_FAKULTAS', 'SEKRETARIS', 'REGISTER');

-- CreateEnum
CREATE TYPE "Exam_Conclution" AS ENUM ('Rejected', 'Approve');

-- CreateEnum
CREATE TYPE "Changes_Conclusion" AS ENUM ('Major', 'Minor');

-- CreateEnum
CREATE TYPE "Pass" AS ENUM ('Pass', 'Fail', 'Repeat');

-- CreateEnum
CREATE TYPE "Revision_Approve" AS ENUM ('Waiting', 'Approve', 'Rejected');

-- CreateEnum
CREATE TYPE "ConsultationStatus" AS ENUM ('Waiting', 'OnProcess', 'Complete');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('GUIDANCE_CLASS', 'MAJOR', 'FACULTY');

-- CreateEnum
CREATE TYPE "Area_Of_Concentration" AS ENUM ('OBJECT_PROGRAMMER', 'COMPETITIVE_INTELEGENT_ANALYSIS', 'NETWORK_ADMINISTRATOR');

-- CreateEnum
CREATE TYPE "Certificate_Level" AS ENUM ('INTERNATIONAL', 'NATIONAL', 'REGION', 'UNIVERSITY', 'MAJOR');

-- CreateEnum
CREATE TYPE "Certificate_Category" AS ENUM ('PENALARAN_KEILMUAN', 'ORGANISASI_KEPEMIMPINAN', 'BAKAT_MINAT', 'PENGABDIAN_MASYARAKAT', 'OTHER');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "token" TEXT,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNum" TEXT,
    "Address" TEXT,
    "degree" TEXT,
    "major" "Major",
    "token" TEXT,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "reg_num" TEXT,
    "nim" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '$2b$10$8i4.tmBGcK619R.lL6goi.GBRA3E7y25fARKYRqIPR46PjwlPV9eu',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "dateOfBirth" DATE,
    "gender" "gender" NOT NULL,
    "religion" TEXT,
    "studentEmail" TEXT,
    "curriculumId" TEXT,
    "arrivalYear" TEXT,
    "address" TEXT,
    "currentResidenceStatus" TEXT,
    "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
    "personalEmail" TEXT,
    "faculty" TEXT,
    "major" "Major",
    "majorGlobalId" TEXT,
    "graduate_year" TEXT,
    "phoneNo" TEXT,
    "areaOfConcentration" "Area_Of_Concentration",
    "token" TEXT,
    "guardianName" TEXT,
    "familyRelation" TEXT,
    "guardianEmail" TEXT,
    "guardianPhoneNo" TEXT,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "filename" TEXT,
    "path" TEXT,
    "biodataCheck" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MajorGlobal" (
    "id" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MajorGlobal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MAHASISWA',
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormSPT" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "reg_num" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "nik" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "faculty" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "minor" TEXT,
    "birth_mother" TEXT NOT NULL,
    "phone_num" TEXT NOT NULL,
    "personal_email" TEXT NOT NULL,
    "graduate_plan" TEXT NOT NULL,
    "remaining_credits" TEXT NOT NULL,
    "remaining_classes" TEXT NOT NULL,
    "certificateURL" TEXT,
    "approval_fac" "status" NOT NULL DEFAULT 'WAITING',
    "approval_reg" "status" NOT NULL DEFAULT 'WAITING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "studentId" TEXT NOT NULL,

    CONSTRAINT "FormSPT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracer_Study" (
    "id" TEXT NOT NULL,
    "kdptimsmh" TEXT NOT NULL,
    "kdpstmsmh" TEXT NOT NULL,
    "nimhsmsmh" TEXT NOT NULL,
    "nmmhsmsmh" TEXT NOT NULL,
    "telpomsmh" TEXT NOT NULL,
    "emailmsmh" TEXT NOT NULL,
    "tahun_lulus" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "npwp" TEXT NOT NULL,
    "f8" TEXT NOT NULL,
    "f504" TEXT,
    "f502" TEXT,
    "f505" TEXT,
    "f506" TEXT,
    "f5a1" TEXT,
    "f5a2" TEXT,
    "f1101" TEXT,
    "f1102" TEXT,
    "f5b" TEXT,
    "f5c" TEXT,
    "f5d" TEXT,
    "f18a" TEXT,
    "f18b" TEXT,
    "f18c" TEXT,
    "f18d" TEXT,
    "f1201" TEXT,
    "f1202" TEXT,
    "f14" TEXT,
    "f15" TEXT,
    "f1761" TEXT,
    "f1762" TEXT,
    "f1763" TEXT,
    "f1764" TEXT,
    "f1765" TEXT,
    "f1766" TEXT,
    "f1767" TEXT,
    "f1768" TEXT,
    "f1769" TEXT,
    "f1770" TEXT,
    "f1771" TEXT,
    "f1772" TEXT,
    "f1773" TEXT,
    "f1774" TEXT,
    "f21" TEXT,
    "f22" TEXT,
    "f23" TEXT,
    "f24" TEXT,
    "f25" TEXT,
    "f26" TEXT,
    "f27" TEXT,
    "f301" TEXT,
    "f302" TEXT,
    "f303" TEXT,
    "f401" TEXT,
    "f402" TEXT,
    "f403" TEXT,
    "f404" TEXT,
    "f405" TEXT,
    "f406" TEXT,
    "f407" TEXT,
    "f408" TEXT,
    "f409" TEXT,
    "f410" TEXT,
    "f411" TEXT,
    "f412" TEXT,
    "f413" TEXT,
    "f414" TEXT,
    "f415" TEXT,
    "f416" TEXT,
    "f6" TEXT,
    "f7" TEXT,
    "f7a" TEXT,
    "f1001" TEXT,
    "f1002" TEXT,
    "f1601" TEXT,
    "f1602" TEXT,
    "f1603" TEXT,
    "f1604" TEXT,
    "f1605" TEXT,
    "f1606" TEXT,
    "f1607" TEXT,
    "f1608" TEXT,
    "f1609" TEXT,
    "f1610" TEXT,
    "f1611" TEXT,
    "f1612" TEXT,
    "f1613" TEXT,
    "f1614" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Tracer_Study_pkey" PRIMARY KEY ("id")
);

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
    "is_report_open" BOOLEAN,
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
    "panelist_chairman_revision_comment" TEXT,
    "panelist_member_revision_comment" TEXT,
    "advisor_revision_comment" TEXT,
    "submission_dateline" TIMESTAMP(3),
    "completed_status" BOOLEAN,
    "approve_date" TIMESTAMP(3),

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
    "is_report_open" BOOLEAN,
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
    "panelist_chairman_revision_comment" TEXT,
    "panelist_member_revision_comment" TEXT,
    "advisor_revision_comment" TEXT,
    "submission_dateline" TIMESTAMP(3),
    "completed_status" BOOLEAN,
    "approve_date" TIMESTAMP(3),
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
    "judul" TEXT,
    "bab1" TEXT,
    "bab2" TEXT,
    "bab3" TEXT,
    "other" TEXT,

    CONSTRAINT "Proposal_Changes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skripsi_Changes" (
    "id" TEXT NOT NULL,
    "skripsi_id" TEXT NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "changes" TEXT,
    "abstrak" TEXT,
    "bab1" TEXT,
    "bab2" TEXT,
    "bab3" TEXT,
    "bab4" TEXT,
    "bab5" TEXT,
    "other" TEXT,

    CONSTRAINT "Skripsi_Changes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal_Conclusion" (
    "id" TEXT NOT NULL,
    "proposal_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "assessment_conclution" TEXT,

    CONSTRAINT "Proposal_Conclusion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skripsi_Conclusion" (
    "id" TEXT NOT NULL,
    "skripsi_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "assessment_conclution" TEXT,

    CONSTRAINT "Skripsi_Conclusion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thesis_Consultation" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dosen_id" TEXT NOT NULL,
    "consultation_status" "Consultation_Status" NOT NULL,

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

-- CreateTable
CREATE TABLE "Thesis_Link" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Thesis_Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_Curriculum" (
    "id" TEXT NOT NULL,
    "major" VARCHAR(100) NOT NULL,
    "year" VARCHAR(50) NOT NULL,

    CONSTRAINT "AKAD_Curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_Subject" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "prerequisite" TEXT,
    "semester" INTEGER NOT NULL,
    "curriculumId" TEXT,

    CONSTRAINT "AKAD_Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_Transaction_Grades" (
    "id" TEXT NOT NULL,
    "submitedDate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approveDate" TIMESTAMPTZ(3),
    "semester" TEXT NOT NULL,
    "comments" TEXT,
    "isInput" BOOLEAN NOT NULL DEFAULT true,
    "status" "status" NOT NULL DEFAULT 'WAITING',
    "studentId" TEXT NOT NULL,

    CONSTRAINT "AKAD_Transaction_Grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_Grades" (
    "id" TEXT NOT NULL,
    "grades" TEXT,
    "lecturer" TEXT NOT NULL,
    "description" TEXT,
    "submited_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subjectId" TEXT,
    "subjectName" TEXT,
    "transactionId" TEXT,

    CONSTRAINT "AKAD_Grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_Grades_access" (
    "id" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "semesterPeriod" TEXT,
    "major" "Major" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "employeeId" TEXT,

    CONSTRAINT "AKAD_Grades_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_PreRegistration" (
    "id" TEXT NOT NULL,
    "semester" "Semester" NOT NULL,
    "semesterPeriod" TEXT NOT NULL,
    "major" "Major" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AKAD_PreRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_PreRegistrationData" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "status" "status" DEFAULT 'WAITING',
    "description" TEXT,
    "comments" TEXT,
    "submitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approveDate" TIMESTAMP(3),
    "preRegistrationId" TEXT NOT NULL,

    CONSTRAINT "AKAD_PreRegistrationData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_ListOfRequest" (
    "preRegistrationDataId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AKAD_Academic_Consultation" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "receiver_name" VARCHAR(255) NOT NULL,
    "topic" VARCHAR(50) NOT NULL,
    "student_name" VARCHAR(255) NOT NULL,
    "supervisor_name" VARCHAR(255) NOT NULL,
    "student_major" VARCHAR(50) NOT NULL,
    "student_arrival_year" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ConsultationStatus" NOT NULL DEFAULT 'Waiting',
    "description" TEXT NOT NULL,

    CONSTRAINT "AKAD_Academic_Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_Message" (
    "id" TEXT NOT NULL,
    "academic_consultation_id" TEXT NOT NULL,
    "sender_name" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AKAD_Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_Certificate" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "Certificate_Category" NOT NULL,
    "level" "Certificate_Level" NOT NULL,
    "description" TEXT NOT NULL,
    "comments" TEXT,
    "approvalDate" TIMESTAMPTZ(3),
    "submitDate" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvalStatus" "status" NOT NULL DEFAULT 'WAITING',
    "studentId" TEXT NOT NULL,

    CONSTRAINT "AKAD_Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isAttendance" BOOLEAN NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "activityType" "ActivityType" NOT NULL,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AKAD_Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_ActivityMember" (
    "presence" BOOLEAN,
    "activityId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AKAD_GuidanceClass" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AKAD_GuidanceClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AKAD_GuidanceClassMember" (
    "studentId" TEXT NOT NULL,
    "guidanceClassId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AKAD_Lecturer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "degree" TEXT NOT NULL,

    CONSTRAINT "AKAD_Lecturer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_token_key" ON "Admin"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_nik_key" ON "Employee"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phoneNum_key" ON "Employee"("phoneNum");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_token_key" ON "Employee"("token");

-- CreateIndex
CREATE INDEX "Employee_email_idx" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_firstName_lastName_key" ON "Employee"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "Student_reg_num_key" ON "Student"("reg_num");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nim_key" ON "Student"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentEmail_key" ON "Student"("studentEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Student_personalEmail_key" ON "Student"("personalEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Student_token_key" ON "Student"("token");

-- CreateIndex
CREATE INDEX "Student_studentEmail_personalEmail_idx" ON "Student"("studentEmail", "personalEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Student_firstName_lastName_key" ON "Student"("firstName", "lastName");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_role_key" ON "UserRole"("userId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Group_submission_id_key" ON "Group"("submission_id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_proposal_id_key" ON "Group"("proposal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_skripsi_id_key" ON "Group"("skripsi_id");

-- CreateIndex
CREATE UNIQUE INDEX "AKAD_Curriculum_major_year_key" ON "AKAD_Curriculum"("major", "year");

-- CreateIndex
CREATE UNIQUE INDEX "AKAD_PreRegistrationData_preRegistrationId_studentId_key" ON "AKAD_PreRegistrationData"("preRegistrationId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "AKAD_ListOfRequest_preRegistrationDataId_subjectId_key" ON "AKAD_ListOfRequest"("preRegistrationDataId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "AKAD_ActivityMember_activityId_studentId_key" ON "AKAD_ActivityMember"("activityId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "AKAD_GuidanceClass_teacherId_key" ON "AKAD_GuidanceClass"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "AKAD_GuidanceClassMember_studentId_key" ON "AKAD_GuidanceClassMember"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "AKAD_GuidanceClassMember_studentId_guidanceClassId_key" ON "AKAD_GuidanceClassMember"("studentId", "guidanceClassId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "AKAD_Curriculum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_majorGlobalId_fkey" FOREIGN KEY ("majorGlobalId") REFERENCES "MajorGlobal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormSPT" ADD CONSTRAINT "FormSPT_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracer_Study" ADD CONSTRAINT "Tracer_Study_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("nim") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "Proposal_Assessment" ADD CONSTRAINT "Proposal_Assessment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal_Assessment" ADD CONSTRAINT "Proposal_Assessment_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Assessment" ADD CONSTRAINT "Skripsi_Assessment_skripsi_id_fkey" FOREIGN KEY ("skripsi_id") REFERENCES "Skripsi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Assessment" ADD CONSTRAINT "Skripsi_Assessment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "Proposal_Conclusion" ADD CONSTRAINT "Proposal_Conclusion_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "Proposal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal_Conclusion" ADD CONSTRAINT "Proposal_Conclusion_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Conclusion" ADD CONSTRAINT "Skripsi_Conclusion_skripsi_id_fkey" FOREIGN KEY ("skripsi_id") REFERENCES "Skripsi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skripsi_Conclusion" ADD CONSTRAINT "Skripsi_Conclusion_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis_Consultation" ADD CONSTRAINT "Thesis_Consultation_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis_Consultation" ADD CONSTRAINT "Thesis_Consultation_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis_History" ADD CONSTRAINT "Thesis_History_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis_Link" ADD CONSTRAINT "Thesis_Link_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Subject" ADD CONSTRAINT "AKAD_Subject_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "AKAD_Curriculum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Transaction_Grades" ADD CONSTRAINT "AKAD_Transaction_Grades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Grades" ADD CONSTRAINT "AKAD_Grades_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "AKAD_Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Grades" ADD CONSTRAINT "AKAD_Grades_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "AKAD_Transaction_Grades"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Grades_access" ADD CONSTRAINT "AKAD_Grades_access_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_PreRegistration" ADD CONSTRAINT "AKAD_PreRegistration_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_PreRegistrationData" ADD CONSTRAINT "AKAD_PreRegistrationData_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_PreRegistrationData" ADD CONSTRAINT "AKAD_PreRegistrationData_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_PreRegistrationData" ADD CONSTRAINT "AKAD_PreRegistrationData_preRegistrationId_fkey" FOREIGN KEY ("preRegistrationId") REFERENCES "AKAD_PreRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_ListOfRequest" ADD CONSTRAINT "AKAD_ListOfRequest_preRegistrationDataId_fkey" FOREIGN KEY ("preRegistrationDataId") REFERENCES "AKAD_PreRegistrationData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_ListOfRequest" ADD CONSTRAINT "AKAD_ListOfRequest_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "AKAD_Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Academic_Consultation" ADD CONSTRAINT "AKAD_Academic_Consultation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Academic_Consultation" ADD CONSTRAINT "AKAD_Academic_Consultation_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Message" ADD CONSTRAINT "AKAD_Message_academic_consultation_id_fkey" FOREIGN KEY ("academic_consultation_id") REFERENCES "AKAD_Academic_Consultation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Certificate" ADD CONSTRAINT "AKAD_Certificate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Activity" ADD CONSTRAINT "AKAD_Activity_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_ActivityMember" ADD CONSTRAINT "AKAD_ActivityMember_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "AKAD_Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_ActivityMember" ADD CONSTRAINT "AKAD_ActivityMember_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_GuidanceClass" ADD CONSTRAINT "AKAD_GuidanceClass_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_GuidanceClassMember" ADD CONSTRAINT "AKAD_GuidanceClassMember_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_GuidanceClassMember" ADD CONSTRAINT "AKAD_GuidanceClassMember_guidanceClassId_fkey" FOREIGN KEY ("guidanceClassId") REFERENCES "AKAD_GuidanceClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
