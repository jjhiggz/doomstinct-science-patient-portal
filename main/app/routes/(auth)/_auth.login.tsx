import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "~/routes/(auth)/-components/login-form";

export const Route = createFileRoute("/(auth)/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
