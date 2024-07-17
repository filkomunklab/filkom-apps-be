import app from "@app";
import { Academic_Calendar, Semester } from "@prisma/client";
import { expect, describe, it, test, afterAll, beforeAll } from "bun:test";
import { cleanDatabase, seedDatabase } from "./helpers";
import { ZodError } from "zod";

let accId: string;

beforeAll(async () => {
  try {
    const { academicCalendar } = await seedDatabase();
    accId = academicCalendar.id;
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

describe("Create", () => {
  const failCondition = [
    { label: "no year", data: { semester: "Ganjil" } },
    { label: "no year", data: { semester: "GANJIL" } },
    { label: "no semester", data: { year: "2022" } },
    { label: "no all", data: {} },
    { label: "wrong type", data: { semester: "GANJIL", year: "20023" } },
  ];
  test.each(failCondition)(
    "should fail on bad request",
    async ({ data: payload, label }) => {
      const res = await app.request("/academic-calendar", {
        body: JSON.stringify(payload),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data: TResponse<ZodError> = await res.json();
      expect(res.status).toBe(400);
      expect(data.error?.issues).toBeArray();
    }
  );

  it("should create successfully", async () => {
    const payload = {
      year: "2024",
      semester: "Ganjil",
    };
    const res = await app.request("/academic-calendar", {
      body: JSON.stringify(payload),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data: TResponse<Academic_Calendar> = await res.json();
    expect(res.status).toBe(201);
    expect(data.data?.id).toBeString();
  });

  it("should fail when academic calendar already exist", async () => {
    const payload = {
      year: "2024",
      semester: "Ganjil",
    };
    const res = await app.request("/academic-calendar", {
      body: JSON.stringify(payload),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data: TResponse = await res.json();
    expect(res.status).toBe(409);
    expect(data.message).toContain("already exist");
  });
});

describe("Get all", () => {
  it("should get academic calendar successfully", async () => {
    const res = await app.request("/academic-calendar");
    const data: TResponse<Academic_Calendar[]> = await res.json();
    expect(res.status).toBe;
    expect(data.data).toBeArray();
    expect(data.data?.[0].id).toBeString();
  });

  it("should get academic calendar successfully with query", async () => {
    const res = await app.request("/academic-calendar?list=true");
    const data: TResponse<Academic_Calendar[]> = await res.json();
    expect(res.status).toBe(200);
    expect(data.data?.[0].semester).toMatch(/^[a-zA-Z]+-\d{4}$/);
  });
});

describe("Get by id", () => {
  it("should fail when the id is not found", async () => {
    const res = await app.request(`/academic-calendar/123`);
    const data: TResponse = await res.json();
    expect(res.status).toBe(404);
    expect(data.message).toContain("not found");
  });

  it("get academic calendar by id successfully", async () => {
    const res = await app.request(`/academic-calendar/${accId}`);
    const data: TResponse<Academic_Calendar> = await res.json();
    expect(res.status).toBe;
    expect(data.data?.id).toBeString();
  });
});

describe("Update", () => {
  it("should fail when the id is not found", async () => {
    const res = await app.request(`/academic-calendar/123`, {
      method: "PATCH",
      body: JSON.stringify({ year: "2023", semester: "Ganjil" }),
      headers: { "Content-Type": "application/json" },
    });
    const data: TResponse = await res.json();
    expect(res.status).toBe(404);
    expect(data.message).toContain("not found");
  });

  const updateCondition = [
    { label: "only year", data: { year: "2021" } },
    { label: "only semester", data: { semester: "Padat" } },
    { label: "both", data: { year: "2023", semester: "Ganjil" } },
  ];
  test.each(updateCondition)(
    "should update data successfully",
    async (data) => {
      const { label, ...payload } = data;
      const res = await app.request(`/academic-calendar/${accId}`, {
        method: "PATCH",
        body: JSON.stringify(payload.data),
        headers: { "Content-Type": "application/json" },
      });
      const result: TResponse<Academic_Calendar> = await res.json();
      expect(res.status).toBe;
      expect(result.data?.id).toBeString();
      data.data?.semester &&
        expect(result.data?.semester).toBe(data.data.semester as Semester);
      data.data?.year && expect(result.data?.year).toBe(data.data.year);
    }
  );
});

describe("Delete", () => {
  it("should delete academic calendar successfully", async () => {
    const res = await app.request(`/academic-calendar/${accId}`, {
      method: "DELETE",
    });
    expect(res.status).toBe(200);
  });
  it("should fail when the id is not found", async () => {
    const res = await app.request(`/academic-calendar/123`, {
      method: "DELETE",
    });
    expect(res.status).toBe(404);
  });
});
