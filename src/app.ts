import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { academicCalendar, academicConsultation, auth } from "./services";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "This is FILKOM APP api",
    maintainer: [
      { name: "DarellYuhu", email: "s2200064@student.unklab.ac.id" },
    ],
  });
});

app.route("/", auth);
app.route("/", academicCalendar);
app.route("/", academicConsultation);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json<TResponse<unknown>>(
      { status: "FAILED", error: err.cause, message: err.message },
      err.status
    );
  }
  console.log(err);
  return c.json<TResponse<unknown>>(
    { status: "FAILED", error: err.cause, message: err.message },
    500
  );
});

export default app;
