-- DropForeignKey
ALTER TABLE "AKAD_Grades" DROP CONSTRAINT "AKAD_Grades_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "AKAD_ListOfRequest" DROP CONSTRAINT "AKAD_ListOfRequest_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_curriculumId_fkey";

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

-- CreateIndex
CREATE UNIQUE INDEX "AKAD_Curriculum_major_year_key" ON "AKAD_Curriculum"("major", "year");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "AKAD_Curriculum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Subject" ADD CONSTRAINT "AKAD_Subject_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "AKAD_Curriculum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_Grades" ADD CONSTRAINT "AKAD_Grades_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "AKAD_Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AKAD_ListOfRequest" ADD CONSTRAINT "AKAD_ListOfRequest_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "AKAD_Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
