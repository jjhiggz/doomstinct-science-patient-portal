import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: ({ context: { user } }) => {
    if (!user) throw redirect({ to: "/login" });

    return {
      user,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
