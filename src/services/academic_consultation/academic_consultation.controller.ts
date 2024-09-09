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

academicConsultation.get("/:userId", async (c) => {
  const { userId } = c.req.param();
  const data = await academic_consultationService.getByUID(userId);
  return c.json<TResponse>({
    status: "OK",
    message: "Academic Consultation Retrieved",
    data,
  });
});

academicConsultation.get("/:userId/:id", async (c) => {
  const { userId, id } = c.req.param();
  const data = await academic_consultationService.getDetail(userId, id);
  return c.json<TResponse>({
    status: "OK",
    message: "Academic Consultation Retrieved",
    data,
  });
});

academicConsultation.patch(
  "/:id",
  zValidator("json", academic_consultationSchema.update),
  async (c) => {
    const { id } = c.req.param();
    const payload = c.req.valid("json");
    const data = await academic_consultationService.update(id, payload);
    return c.json<TResponse>({
      status: "OK",
      message: "Academic Consultation Updated",
      data,
    });
  }
);

export default academicConsultation;
