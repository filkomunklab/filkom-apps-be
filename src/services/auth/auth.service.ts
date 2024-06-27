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

export default { signInAdmin };
