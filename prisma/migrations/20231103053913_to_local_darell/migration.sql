/*
  Warnings:

  - Added the required column `date_of_birth` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculty` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nim` to the `FormSPT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reg_num` to the `FormSPT` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "FormSPT" ADD COLUMN     "date_of_birth" TEXT NOT NULL,
ADD COLUMN     "faculty" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL,
ADD COLUMN     "nim" TEXT NOT NULL,
ADD COLUMN     "phone_num" TEXT,
ADD COLUMN     "reg_num" TEXT NOT NULL;
