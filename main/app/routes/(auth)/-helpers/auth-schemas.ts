import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(["HEALTH_SIDE", "PATIENT_SIDE"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ClientUser = z.infer<typeof clientUserSchema>;
export const clientUserSchema = userSchema.strip().pick({
  id: true,
  email: true,
  role: true,
});
