import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import academic_consultationSchema from "./academic_consultation.schema";
import academic_consultationService from "./academic_consultation.service";

const academicConsultation = new Hono().basePath("/academic-consultation");

academicConsultation.post(
  "/",
  zValidator("json", academic_consultationSchema.create),
  async (c) => {
    const payload = c.req.valid("json");
    const data = await academic_consultationService.create(payload);
    return c.json(
      { status: "OK", message: "Academic Consultation Created", data },
      201
    );
  }
);

academicConsultation.get("/:id", async (c) => {});

academicConsultation.get("/student/:id", async (c) => {});

academicConsultation.get("/employee/:id", async (c) => {});

academicConsultation.patch("/:id", async (c) => {});

export default academicConsultation;
