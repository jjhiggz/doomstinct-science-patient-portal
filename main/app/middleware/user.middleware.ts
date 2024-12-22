import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/start";
import { useAuthSession } from "~/session";

export const requireUserMiddleware = createMiddleware().server(
  async ({ next }) => {
    const authSession = await useAuthSession();
    if (!authSession.data.user) {
      throw redirect({ to: "/login" });
    }
    return next({
      context: {
        user: authSession.data.user,
      },
    });
  }
);
