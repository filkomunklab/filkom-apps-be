import prisma from "@database";
import { sign } from "hono/jwt";
import { Config } from "../../config";
import { HTTPException } from "hono/http-exception";

type Login = {
  username: string;
  password: string;
};

const signInAdmin = async ({ username, password }: Login) => {
  const user = await prisma.admin.findUnique({ where: { username } });

  if (user) {
    const checkPassword = await Bun.password.verify(
      password,
      user.password,
      "bcrypt"
    );
    if (checkPassword) {
      const token = await sign(
        {
          user: {
            id: user.id,
            name: user.username,
            email: user.email,
            role: user.role,
          },
        },
        Config.SECRET_KEY
      );
      user.token = token;
      await prisma.admin.update({
        where: { username },
        data: {
          token,
        },
      });
      const data = {
        user: {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role,
        },
        token: token,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      };
      return data;
    } else {
      throw new HTTPException(401, {
        message: "Username or password incorrect",
      });
    }
  } else {
    throw new HTTPException(401, { message: "Username or password incorrect" });
  }
};

const signInEmployee = async ({ username, password }: Login) => {
  const employee = await prisma.employee.findUnique({
    where: { nik: username },
    include: { GuidanceClass: true },
  });

  if (employee) {
    const role = await prisma.userRole.findMany({
      where: { userId: employee.id },
    });
    const checkPassword = await Bun.password.verify(
      password,
      employee.password
    );
    if (checkPassword) {
      const token = await sign(
        {
          user: {
            id: employee.id,
            nik: employee.nik,
            name: `${employee.firstName} ${employee.lastName}`,
            role: role,
          },
        },
        Config.SECRET_KEY
      );
      employee.token = token;
      const data = {
        user: {
          id: employee.id,
          nik: employee.nik,
          name: `${employee.firstName} ${employee.lastName}`,
          role: role,
          guidanceClassId: employee.GuidanceClass?.id,
        },
        token: token,
      };
      return data;
    } else {
      throw new HTTPException(401, { message: "email or password incorrect" });
    }
  } else {
    throw new HTTPException(401, { message: "email or password incorrect" });
  }
};

const signInStudent = async ({ username, password }: Login) => {
  const student = await prisma.student.findUnique({
    where: { nim: username },
    include: { GuidanceClassMember: true },
  });

  if (student) {
    const role = await prisma.userRole.findMany({
      where: { userId: student.id },
    });
    const checkPassword = await Bun.password.verify(password, student.password);
    if (checkPassword) {
      const token = await sign(
        {
          user: {
            id: student.id,
            nim: student.nim,
            name: `${student.firstName} ${student.lastName}`,
            role: role,
            majorGlobalId: student.majorGlobalId,
          },
        },
        Config.SECRET_KEY
      );
      student.token = token;
      const { GuidanceClassMember, majorGlobalId, curriculumId } = student;
      const data = {
        user: {
          id: student.id,
          nim: student.nim,
          name: `${student.firstName} ${student.lastName}`,
          status: student.status,
          role: role[0],
          majorGlobalId: majorGlobalId,
          curriculumId: curriculumId,
          guidanceClassId: GuidanceClassMember?.guidanceClassId,
        },
        token: token,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      };
      return data;
    } else {
      throw new HTTPException(401, { message: "email or password incorrect" });
    }
  } else {
    throw new HTTPException(401, { message: "email or password incorrect" });
  }
};

export default { signInAdmin, signInEmployee, signInStudent };
