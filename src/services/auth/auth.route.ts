import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import authSchema from "./auth.schema";
import authService from "./auth.service";
import { HTTPException } from "hono/http-exception";

const authRoute = new Hono().basePath("/auth");

authRoute.post(
  "/signin-admin",
  zValidator("json", authSchema.login, (res, c) => {
    if (!res.success) {
      throw new HTTPException(400, {
        message: "Please provide valid data",
        cause: res.error,
      });
    }
  }),
  async (c) => {
    const { username, password } = c.req.valid("json");
    const admin = await authService.signInAdmin({ username, password });
    return c.json(
      { status: "SUCCESS", message: "Login Success", data: admin },
      200
    );
  }
);

authRoute.post(
  "/signin-employee",
  zValidator("json", authSchema.login, (res, c) => {
    if (!res.success) {
      throw new HTTPException(400, {
        message: "Please provide valid data",
        cause: res.error,
      });
    }
  }),
  async (c) => {
    const { username, password } = c.req.valid("json");
    const employee = await authService.signInEmployee({ username, password });
    return c.json(
      { status: "SUCCESS", message: "Login Success", data: employee },
      200
    );
  }
);

export default authRoute;
