import { z, ZodSchema } from "zod";

export const validateWithZod =
  <InputSchema extends ZodSchema>(schema: InputSchema) =>
  (input: z.infer<InputSchema>) => {
    return schema.parse(input) as z.infer<InputSchema>;
  };
