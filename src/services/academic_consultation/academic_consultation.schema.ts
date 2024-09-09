import { ConsultationStatus } from "@prisma/client";
import { z } from "zod";

const create = z.object({
  studentId: z.string(),
  receiverId: z.string(),
  receiver_name: z.string(),
  supervisor_name: z.string(),
  topic: z.string(),
  student_name: z.string(),
  student_major: z.string(),
  student_arrival_year: z.string(),
  description: z.string(),
});

const update = z.object({
  status: z.nativeEnum(ConsultationStatus),
});

export default { create, update };
