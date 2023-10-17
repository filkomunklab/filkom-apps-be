-- CreateEnum
CREATE TYPE "statusSPT" AS ENUM ('WAITING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('LAKILAKI', 'PEREMPUAN');

-- CreateTable
CREATE TABLE "FormSPT" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "gender" "gender" NOT NULL,
    "birth_mother" TEXT NOT NULL,
    "graduate_plan" TEXT NOT NULL,
    "remaining_credits" TEXT NOT NULL,
    "remaining_classes" TEXT NOT NULL,
    "status" "statusSPT" NOT NULL DEFAULT 'WAITING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "studentId" TEXT NOT NULL,

    CONSTRAINT "FormSPT_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FormSPT_nik_key" ON "FormSPT"("nik");

-- AddForeignKey
ALTER TABLE "FormSPT" ADD CONSTRAINT "FormSPT_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
