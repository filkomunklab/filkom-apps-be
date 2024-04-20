-- DropForeignKey
ALTER TABLE "Cpl" DROP CONSTRAINT "Cpl_curriculumId_fkey";

-- DropForeignKey
ALTER TABLE "Curriculum_Subject" DROP CONSTRAINT "Curriculum_Subject_curriculumId_fkey";

-- DropForeignKey
ALTER TABLE "Subject_Cpl" DROP CONSTRAINT "Subject_Cpl_cplId_fkey";

-- DropForeignKey
ALTER TABLE "SupportedCpl" DROP CONSTRAINT "SupportedCpl_cplId_fkey";

-- AddForeignKey
ALTER TABLE "Curriculum_Subject" ADD CONSTRAINT "Curriculum_Subject_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cpl" ADD CONSTRAINT "Cpl_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject_Cpl" ADD CONSTRAINT "Subject_Cpl_cplId_fkey" FOREIGN KEY ("cplId") REFERENCES "Cpl"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportedCpl" ADD CONSTRAINT "SupportedCpl_cplId_fkey" FOREIGN KEY ("cplId") REFERENCES "Cpl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
