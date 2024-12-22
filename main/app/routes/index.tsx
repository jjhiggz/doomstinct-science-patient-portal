import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: ({ context }) => {
    if (context.user) throw redirect({ to: "/dashboard" });
    else throw redirect({ to: "/login" });
  },
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
