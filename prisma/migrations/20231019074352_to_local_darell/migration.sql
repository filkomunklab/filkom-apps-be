/*
  Warnings:

  - The `approvalFak` column on the `FormSPT` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `approvalReg` column on the `FormSPT` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('WAITING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "FormSPT" DROP COLUMN "approvalFak",
ADD COLUMN     "approvalFak" "status" NOT NULL DEFAULT 'WAITING',
DROP COLUMN "approvalReg",
ADD COLUMN     "approvalReg" "status" NOT NULL DEFAULT 'WAITING';

-- DropEnum
DROP TYPE "approvalFak";

-- DropEnum
DROP TYPE "approvalReg";
