import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "~/db";
import { Role, User } from "@prisma/client";
import { VITE_ENV } from "~/env";
import { SignUpSchema } from "./auth-schemas";

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const doctorDomains = ["doomstinct-science.com"];

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

export const createJWT = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    VITE_ENV.VITE_JWT_SECRET,
    { expiresIn: "7d" }
  );
};
