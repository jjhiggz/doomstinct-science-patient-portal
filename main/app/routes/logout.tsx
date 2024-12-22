import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthSession } from "../session";
import { createServerFn } from "@tanstack/start";

export const $clearSession = createServerFn().handler(async () => {
  const session = await useAuthSession();
  await session.clear();
  throw redirect({ to: "/" });
});
export const Route = createFileRoute("/logout")({
  component: RouteComponent,
  loader: async () => {
    await $clearSession();
  },
  preload: false,
});

function RouteComponent() {
  return <div>Hello "/logout"!</div>;
}
