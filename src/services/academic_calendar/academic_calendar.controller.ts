import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import academic_calendarSchema from "./academic_calendar.schema";
import academic_calendarService from "./academic_calendar.service";
import { Prisma } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

const academicCalendar = new Hono().basePath("/academic-calendar");

academicCalendar.post(
  "/",
  zValidator("json", academic_calendarSchema.create),
  async (c) => {
    const { semester, year } = c.req.valid("json");
    const data = await academic_calendarService.create(year, semester);
    return c.json<TResponse>(
      { status: "OK", message: "Academic Calendar Created", data },
      201
    );
  }
);

academicCalendar.get("/:id", async (c) => {
  const { id } = c.req.param();
  const data = await academic_calendarService.getById(id);
  return c.json<TResponse>(
    { status: "OK", message: "Academic Calendar Retrieved", data },
    200
  );
});

academicCalendar.get(
  "/",
  zValidator("query", academic_calendarSchema.query),
  async (c) => {
    const { list } = c.req.valid("query");
    const data = await academic_calendarService.getAll(list);
    return c.json<TResponse>(
      { status: "OK", message: "Academic Calendar Retrieved", data },
      200
    );
  }
);
academicCalendar.patch(
  "/:id",
  zValidator("json", academic_calendarSchema.update),
  async (c) => {
    try {
      const { id } = c.req.param();
      const { semester, year } = c.req.valid("json");
      const data = await academic_calendarService.update(id, year, semester);
      return c.json<TResponse>(
        { status: "OK", message: "Academic Calendar Updated", data },
        200
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new HTTPException(404, {
            message: "Academic calendar not found",
            cause: error,
          });
        }
      }
    }
  }
);
academicCalendar.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    await academic_calendarService._delete(id);
    return c.json<TResponse>(
      { status: "OK", message: "Academic Calendar Deleted" },
      200
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new HTTPException(404, {
          message: "Academic calendar not found",
          cause: error,
        });
      }
    }
  }
});

export default academicCalendar;
