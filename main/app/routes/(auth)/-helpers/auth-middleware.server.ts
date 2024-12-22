import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/start";
import { pipe } from "remeda";
import { getRequestHeaders } from "vinxi/http";
import jwt from "jsonwebtoken";
import { clientUserSchema } from "./auth-schemas";
import { $setHeadersMiddleware } from "./auth-middleware.client";
import { VITE_ENV } from "~/env";

const $validateRequestMiddleware = createMiddleware().server(
  async ({ next }) => {
    const headers = getRequestHeaders();
    const jwtToken = headers.Authorization?.split(" ")[1];
    if (!jwtToken) throw redirect({ to: "/login" });
    const userData = await pipe(
      jwt.verify(jwtToken, VITE_ENV.VITE_JWT_SECRET),
      clientUserSchema.parse
    );

    return next({
      context: {
        user: userData,
      },
    });
  }
);

export const authMiddleware = createMiddleware().middleware([
  $setHeadersMiddleware,
  $validateRequestMiddleware,
]);
