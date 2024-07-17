import { Semester } from "@prisma/client";
import { z } from "zod";

const query = z.object({
  list: z.preprocess((value) => value === "true", z.boolean()).optional(),
});

const create = z.object({
  semester: z
    .string()
    .refine(
      (value) => Object.keys(Semester).includes(value),
      "Invalid semester"
    ),
  year: z.string(),
});

const update = z.object({
  semester: z
    .string()
    .refine(
      (value) => Object.keys(Semester).includes(value),
      "Invalid semester"
    )
    .optional(),
  year: z.string().optional(),
});

export default { query, create, update };
