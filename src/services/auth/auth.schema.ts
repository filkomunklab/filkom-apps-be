import { z } from "zod";

const login = z.object({
  username: z.string(),
  password: z.string(),
});

export default { login };
