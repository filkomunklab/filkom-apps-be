import app from "@app";
import { AKAD_Academic_Consultation, Employee, Student } from "@prisma/client";
import { expect, describe, it, test, afterAll, beforeAll } from "bun:test";
import { cleanDatabase, seedDatabase } from "./helpers";

let student: Student;
let teacher: Employee;

beforeAll(async () => {
  try {
    const { students, employees } = await seedDatabase();
    student = students[0];
    teacher = employees[0];
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
  it("should create successfully", async () => {
    const payload = {
      studentId: student.id,
      receiverId: teacher.id,
      receiver_name: `${teacher.firstName} ${teacher.lastName}`,
      supervisor_name: `${teacher.firstName} ${teacher.lastName}`,
      topic: "Topic",
      student_name: `${student.firstName} ${student.lastName}`,
      student_major: student.major ?? "TI",
      student_arrival_year: "2020",
      description: "Description",
    };
    const res = await app.request("/academic-consultation", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const data: TResponse<AKAD_Academic_Consultation> = await res.json();
    expect(res.status).toBe(201);
    expect(data.data?.id).toBeString();
  });
});
