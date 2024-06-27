import app from "@app";
import { expect, describe, it, test, afterAll, beforeAll } from "bun:test";
import { cleanDatabase, seedDatabase } from "./helpers";

let username: string;

beforeAll(async () => {
  try {
    const { admin } = await seedDatabase();
    username = admin.username;
  } catch (error) {
    console.log("ERR_SEED", error);
  }
});

afterAll(async () => {
  try {
    await cleanDatabase();
  } catch (error) {
    console.log("ERR_SEED", error);
  }
});

describe("Login Admin", () => {
  it("should login successfully", async () => {
    const res = await app.request("/auth/signin-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password: "12345",
      }),
    });
    const data: TResponse<{ token: string }> = await res.json();
    expect(res.status).toBe(200);
    expect(data.status).toBe("SUCCESS");
    expect(data.data?.token).toBeString();
  });
});
