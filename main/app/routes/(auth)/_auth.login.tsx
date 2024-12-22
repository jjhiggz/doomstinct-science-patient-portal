import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "~/shadcn/components/login-form";

export const Route = createFileRoute("/(auth)/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
