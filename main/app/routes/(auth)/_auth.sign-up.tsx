import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignUpForm } from "~/routes/(auth)/-components/sign-up-form";

export const Route = createFileRoute("/(auth)/_auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUpForm />;
}
