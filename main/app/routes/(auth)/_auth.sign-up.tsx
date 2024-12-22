import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "~/shadcn/components/sign-up-form";

export const Route = createFileRoute("/(auth)/_auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUpForm />;
}
