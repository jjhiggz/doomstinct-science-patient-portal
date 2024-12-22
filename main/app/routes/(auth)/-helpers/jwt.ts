import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { VITE_ENV } from "~/env";
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
