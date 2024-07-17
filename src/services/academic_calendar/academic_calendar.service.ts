import prisma from "@database";
import { Prisma, Semester } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const create = async (year: string, semester: string) => {
  try {
    const academicCalendar = await prisma.academic_Calendar.create({
      data: { year, semester: semester as Semester },
    });
    return academicCalendar;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new HTTPException(409, {
          message: "Academic Calendar already exists",
          cause: error,
        });
      }
    }
    throw error;
  }
};

const getAll = async (list?: boolean) => {
  const academicCalender = await prisma.academic_Calendar.findMany();
  if (list) {
    return academicCalender.map((item) => ({
      id: item.id,
      semester: `${item.semester}-${item.year}`,
    }));
  }
  return academicCalender;
};

const getById = async (id: string) => {
  const academicCalendar = await prisma.academic_Calendar.findUnique({
    where: { id },
  });
  if (!academicCalendar) {
    throw new HTTPException(404, { message: "Academic Calendar not found" });
  }
  return academicCalendar;
};

const update = async (id: string, year?: string, semester?: string) => {
  const academicCalendar = await prisma.academic_Calendar.update({
    where: { id },
    data: {
      year,
      semester: semester as Semester,
    },
  });
  return academicCalendar;
};

const _delete = async (id: string) => {
  await prisma.academic_Calendar.delete({ where: { id } });
};

export default { create, getAll, update, _delete, getById };
