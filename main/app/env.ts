import { z } from "zod";

export const VITE_ENV = z
  .object({
    VITE_JWT_SECRET: z.string(),
    VITE_SESSION_SECRET: z.string(),
  })
  .parse(import.meta.env);
