import { createMiddleware } from "@tanstack/start";
import { getRequestHeaders } from "vinxi/http";
import { getJWTFromLocalStorage } from "../-components/-utils.client";
import { redirect } from "@tanstack/react-router";

export const $setHeadersMiddleware = createMiddleware().client(
  async ({ next, data }) => {
    // Get the JWT token from the response
    const headers = getRequestHeaders();
    const rawToken = await getJWTFromLocalStorage();
    if (!rawToken) throw redirect({ to: "/login" });

    return next({
      headers: {
        ...headers,
        Authorization: `Bearer ${rawToken}`,
      },
    });
  }
);
