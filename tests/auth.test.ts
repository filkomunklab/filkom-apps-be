import app from "@app";
import { expect, describe, it, test, afterAll, beforeAll } from "bun:test";
import { cleanDatabase, seedDatabase } from "./helpers";
import { ZodError } from "zod";
import { Admin, Employee, Prisma, Student } from "@prisma/client";

let adminCred: Admin;
let employeeCred: Employee & { username?: string };
let studentCred: Student & { username?: string };

beforeAll(async () => {
  try {
    const { admin, employees, students } = await seedDatabase();
    adminCred = admin;

    employeeCred = employees[0];
    employeeCred.username = employeeCred.nik;

    studentCred = students[0];
    studentCred.username = studentCred.nim;
  } catch (error) {
    console.log("ERR_SEED", error);
  }
});

afterAll(async () => {
  try {
    await cleanDatabase();
  } catch (error) {
    console.log("ERR_CLEANUP", error);
  }
});

describe("Login Admin", () => {
  test.each([
    ["no username", undefined, "password"],
    ["no password", "username", undefined],
    ["no all", undefined, undefined],
  ])("should fail when %s (400)", async (_, username, password) => {
    const res = await app.request("/auth/signin-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data: TResponse<ZodError> = await res.json();
    expect(res.status).toBe(400);
    expect(data.status).toBe("FAILED");
    expect(data.error?.issues).toBeArray();
  });

  test.each([
    ["wrong username", "username"],
    ["wrong password", "password"],
  ])("should fail when %s (401)", async (_, key) => {
    let payload = {
      username: adminCred.username,
      password: adminCred.password,
      [key]: adminCred[key as keyof Admin],
    };
    const res = await app.request("/auth/signin-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data: TResponse = await res.json();
    expect(res.status).toBe(401);
    expect(data.message).toBeString();
  });

  it("should login successfully (200)", async () => {
    const res = await app.request("/auth/signin-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: adminCred.username,
        password: "12345",
      }),
    });
    const data: TResponse<{ token: string }> = await res.json();
    expect(res.status).toBe(200);
    expect(data.status).toBe("SUCCESS");
    expect(data.data?.token).toBeString();
  });
});

describe("Login Employee", () => {
  test.each([
    ["no username", undefined, "password"],
    ["no password", "username", undefined],
    ["no all", undefined, undefined],
  ])("should fail when %s (400)", async (_, username, password) => {
    const res = await app.request("/auth/signin-employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data: TResponse<ZodError> = await res.json();
    expect(res.status).toBe(400);
    expect(data.status).toBe("FAILED");
    expect(data.error?.issues).toBeArray();
  });

  test.each([
    ["wrong username", "username"],
    ["wrong password", "password"],
  ])("should fail when %s (401)", async (_, key) => {
    let payload = {
      username: employeeCred.username,
      password: employeeCred.password,
      [key]: employeeCred[key as keyof Employee],
    };
    const res = await app.request("/auth/signin-employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data: TResponse = await res.json();
    expect(res.status).toBe(401);
    expect(data.message).toBeString();
  });

  it("should login successfully (200)", async () => {
    const res = await app.request("/auth/signin-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: employeeCred.nik,
        password: "12345",
      }),
    });
    const data: TResponse<{ token: string }> = await res.json();
    expect(res.status).toBe(200);
    expect(data.status).toBe("SUCCESS");
    expect(data.data?.token).toBeString();
  });
});

describe("Login Student", () => {
  test.each([
    ["no username", undefined, "password"],
    ["no password", "username", undefined],
    ["no all", undefined, undefined],
  ])("should fail when %s (400)", async (_, username, password) => {
    const res = await app.request("/auth/signin-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data: TResponse<ZodError> = await res.json();
    expect(res.status).toBe(400);
    expect(data.status).toBe("FAILED");
    expect(data.error?.issues).toBeArray();
  });

  test.each([
    ["wrong username", "username"],
    ["wrong password", "password"],
  ])("should fail when %s (401)", async (_, key) => {
    let payload = {
      username: studentCred.username,
      password: studentCred.password,
      [key]: studentCred[key as keyof Student],
    };
    const res = await app.request("/auth/signin-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data: TResponse = await res.json();
    expect(res.status).toBe(401);
    expect(data.message).toBeString();
  });

  it("should login successfully (200)", async () => {
    const res = await app.request("/auth/signin-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: studentCred.username,
        password: "12345",
      }),
    });
    const data: TResponse<{ token: string }> = await res.json();
    expect(res.status).toBe(200);
    expect(data.status).toBe("SUCCESS");
    expect(data.data?.token).toBeString();
  });
});
