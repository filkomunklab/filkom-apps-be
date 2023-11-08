/*
  Warnings:

  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentGuardianId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `StudentGuardian` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date_of_birth` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nim` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personal_email` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_num` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reg_num` to the `FormSPT` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_studentGuardianId_fkey";

-- DropIndex
DROP INDEX "Student_email_key";

-- AlterTable
ALTER TABLE "FormSPT" ADD COLUMN     "date_of_birth" TEXT NOT NULL,
ADD COLUMN     "faculty" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL,
ADD COLUMN     "nim" TEXT NOT NULL,
ADD COLUMN     "personal_email" TEXT NOT NULL,
ADD COLUMN     "phone_num" TEXT NOT NULL,
ADD COLUMN     "reg_num" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "email",
DROP COLUMN "studentGuardianId",
ADD COLUMN     "familyRelation" TEXT,
ADD COLUMN     "guardianAddress" TEXT,
ADD COLUMN     "guardianEducation" TEXT,
ADD COLUMN     "guardianEmail" TEXT,
ADD COLUMN     "guardianName" TEXT,
ADD COLUMN     "guardianPhoneNo" TEXT,
ADD COLUMN     "guardianReligion" TEXT,
ADD COLUMN     "guardianStatus" TEXT;

-- AlterTable
ALTER TABLE "Tracer_Study" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "f504" DROP NOT NULL,
ALTER COLUMN "f502" DROP NOT NULL,
ALTER COLUMN "f505" DROP NOT NULL,
ALTER COLUMN "f506" DROP NOT NULL,
ALTER COLUMN "f5a1" DROP NOT NULL,
ALTER COLUMN "f5a2" DROP NOT NULL,
ALTER COLUMN "f1101" DROP NOT NULL,
ALTER COLUMN "f1102" DROP NOT NULL,
ALTER COLUMN "f5b" DROP NOT NULL,
ALTER COLUMN "f5c" DROP NOT NULL,
ALTER COLUMN "f5d" DROP NOT NULL,
ALTER COLUMN "f18a" DROP NOT NULL,
ALTER COLUMN "f18b" DROP NOT NULL,
ALTER COLUMN "f18c" DROP NOT NULL,
ALTER COLUMN "f18d" DROP NOT NULL,
ALTER COLUMN "f1201" DROP NOT NULL,
ALTER COLUMN "f1202" DROP NOT NULL,
ALTER COLUMN "f14" DROP NOT NULL,
ALTER COLUMN "f15" DROP NOT NULL,
ALTER COLUMN "f1761" DROP NOT NULL,
ALTER COLUMN "f1762" DROP NOT NULL,
ALTER COLUMN "f1763" DROP NOT NULL,
ALTER COLUMN "f1764" DROP NOT NULL,
ALTER COLUMN "f1765" DROP NOT NULL,
ALTER COLUMN "f1766" DROP NOT NULL,
ALTER COLUMN "f1767" DROP NOT NULL,
ALTER COLUMN "f1768" DROP NOT NULL,
ALTER COLUMN "f1769" DROP NOT NULL,
ALTER COLUMN "f1770" DROP NOT NULL,
ALTER COLUMN "f1771" DROP NOT NULL,
ALTER COLUMN "f1772" DROP NOT NULL,
ALTER COLUMN "f1773" DROP NOT NULL,
ALTER COLUMN "f1774" DROP NOT NULL,
ALTER COLUMN "f21" DROP NOT NULL,
ALTER COLUMN "f22" DROP NOT NULL,
ALTER COLUMN "f23" DROP NOT NULL,
ALTER COLUMN "f24" DROP NOT NULL,
ALTER COLUMN "f25" DROP NOT NULL,
ALTER COLUMN "f26" DROP NOT NULL,
ALTER COLUMN "f27" DROP NOT NULL,
ALTER COLUMN "f301" DROP NOT NULL,
ALTER COLUMN "f302" DROP NOT NULL,
ALTER COLUMN "f303" DROP NOT NULL,
ALTER COLUMN "f401" DROP NOT NULL,
ALTER COLUMN "f402" DROP NOT NULL,
ALTER COLUMN "f403" DROP NOT NULL,
ALTER COLUMN "f404" DROP NOT NULL,
ALTER COLUMN "f405" DROP NOT NULL,
ALTER COLUMN "f406" DROP NOT NULL,
ALTER COLUMN "f407" DROP NOT NULL,
ALTER COLUMN "f408" DROP NOT NULL,
ALTER COLUMN "f409" DROP NOT NULL,
ALTER COLUMN "f410" DROP NOT NULL,
ALTER COLUMN "f411" DROP NOT NULL,
ALTER COLUMN "f412" DROP NOT NULL,
ALTER COLUMN "f413" DROP NOT NULL,
ALTER COLUMN "f414" DROP NOT NULL,
ALTER COLUMN "f415" DROP NOT NULL,
ALTER COLUMN "f416" DROP NOT NULL,
ALTER COLUMN "f6" DROP NOT NULL,
ALTER COLUMN "f7" DROP NOT NULL,
ALTER COLUMN "f7a" DROP NOT NULL,
ALTER COLUMN "f1001" DROP NOT NULL,
ALTER COLUMN "f1002" DROP NOT NULL,
ALTER COLUMN "f1601" DROP NOT NULL,
ALTER COLUMN "f1602" DROP NOT NULL,
ALTER COLUMN "f1603" DROP NOT NULL,
ALTER COLUMN "f1604" DROP NOT NULL,
ALTER COLUMN "f1605" DROP NOT NULL,
ALTER COLUMN "f1606" DROP NOT NULL,
ALTER COLUMN "f1607" DROP NOT NULL,
ALTER COLUMN "f1608" DROP NOT NULL,
ALTER COLUMN "f1609" DROP NOT NULL,
ALTER COLUMN "f1610" DROP NOT NULL,
ALTER COLUMN "f1611" DROP NOT NULL,
ALTER COLUMN "f1612" DROP NOT NULL,
ALTER COLUMN "f1613" DROP NOT NULL,
ALTER COLUMN "f1614" DROP NOT NULL;

-- DropTable
DROP TABLE "StudentGuardian";
