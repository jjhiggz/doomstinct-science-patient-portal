import { createFileRoute, redirect } from "@tanstack/react-router";
import { match, P } from "ts-pattern";
import { toast } from "~/shadcn/hooks/use-toast";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: ({ context }) => {
    const redirectTo = match(context?.user?.role)
      .with("HEALTH_SIDE", () => {
        return redirect({ to: "/dashboard/health-care" });
      })
      .with("PATIENT_SIDE", () => {
        return redirect({ to: "/dashboard/health-care" });
      })
      .with(P.nullish, () => {
        return redirect({ to: "/login" });
      })
      .otherwise(() => null);

    if (redirectTo === null) {
      toast({
        variant: "destructive",
        title: `Do not know where to redirect to for user role ${context.user?.role}`,
      });
    } else {
      throw redirectTo;
    }
  },
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
