-- DropForeignKey
ALTER TABLE "FormSPT" DROP CONSTRAINT "FormSPT_studentId_fkey";

-- AddForeignKey
ALTER TABLE "FormSPT" ADD CONSTRAINT "FormSPT_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("nim") ON DELETE RESTRICT ON UPDATE CASCADE;
