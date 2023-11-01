/*
  Warnings:

  - The values [SI,IF] on the enum `Major` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Major_new" AS ENUM ('Informatika', 'Sistem_Informasi');
ALTER TABLE "Employee" ALTER COLUMN "major" TYPE "Major_new" USING ("major"::text::"Major_new");
ALTER TABLE "Student" ALTER COLUMN "major" TYPE "Major_new" USING ("major"::text::"Major_new");
ALTER TYPE "Major" RENAME TO "Major_old";
ALTER TYPE "Major_new" RENAME TO "Major";
DROP TYPE "Major_old";
COMMIT;
