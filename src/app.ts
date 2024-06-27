import { Hono } from "hono";
import { authRoute } from "./services";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "This is FILKOM APP api",
    maintainer: [
      { name: "DarellYuhu", email: "s2200064@student.unklab.ac.id" },
    ],
  });
});

app.route("/", authRoute);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json<TResponse<unknown>>(
      { status: "FAILED", error: err.cause, message: err.message },
      err.status
    );
  }
  return c.json<TResponse<unknown>>(
    { status: "FAILED", error: err.cause, message: err.message },
    500
  );
});

export default app;
