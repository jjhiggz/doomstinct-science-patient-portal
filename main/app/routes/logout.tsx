import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthSession } from "../session";

export const Route = createFileRoute("/logout")({
  component: RouteComponent,
  loader: async () => {
    const session = await useAuthSession();
    session.clear();
    throw redirect({ to: "/" });
  },
  preload: false,
});

function RouteComponent() {
  return <div>Hello "/logout"!</div>;
}
