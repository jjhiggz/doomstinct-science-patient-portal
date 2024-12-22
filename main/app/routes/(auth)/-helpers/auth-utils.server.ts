import bcrypt from "bcrypt";
import { prisma } from "~/db";
import { Role } from "@prisma/client";
import { SignUpSchema } from "./auth-schemas";

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const doctorDomains = ["doomstinct-science.com", "instinct-science.com"];

const assignRoleByDomain = (email: string): Role => {
  const domain = email.split("@")[1];
  return doctorDomains.includes(domain) ? "HEALTH_SIDE" : "PATIENT_SIDE";
};

export const createUser = async ({
  email,
  password,
}: Omit<SignUpSchema, "confirmPassword">) => {
  const hashedPassword = await hashPassword(password);
  const role = assignRoleByDomain(email);

  return await prisma.user.create({
    data: {
      email,
      role,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
};

export const verifyPassword = (a: string, b: string) => {
  return bcrypt.compare(a, b);
};
