import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/logout" className="underline underline-offset-4">
        Logout
      </Link>
    </div>
  );
}
