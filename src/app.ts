import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "This is FILKOM APP api",
    maintainer: [
      { name: "DarellYuhu", email: "s2200064@student.unklab.ac.id" },
    ],
  });
});

export default app;
