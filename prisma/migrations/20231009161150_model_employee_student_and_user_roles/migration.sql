-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'MAHASISWA';
ALTER TYPE "Role" ADD VALUE 'ADMIN_LPMI';
ALTER TYPE "Role" ADD VALUE 'OPERATOR_LPMI';
ALTER TYPE "Role" ADD VALUE 'ALUMNI';
ALTER TYPE "Role" ADD VALUE 'DEKAN';
ALTER TYPE "Role" ADD VALUE 'KAPRODI';
ALTER TYPE "Role" ADD VALUE 'DOSEN';

