/*
  Warnings:

  - You are about to drop the column `status` on the `FormSPT` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "approvalFak" AS ENUM ('WAITING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "approvalReg" AS ENUM ('APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "FormSPT" DROP COLUMN "status",
ADD COLUMN     "approvalFak" "approvalFak" NOT NULL DEFAULT 'WAITING',
ADD COLUMN     "approvalReg" "approvalReg";

-- DropEnum
DROP TYPE "statusSPT";
