/*
  Warnings:

  - A unique constraint covering the columns `[year,semester]` on the table `Academic_Calendar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Academic_Calendar_year_semester_key" ON "Academic_Calendar"("year", "semester");
