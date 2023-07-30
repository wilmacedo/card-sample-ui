import { z } from "zod";

const schema = z.object({
  HOST: z.string().default("http://localhost:3333"),
});

const _env = schema.safeParse(process.env);

if (_env.success === false) {
  console.log("Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
