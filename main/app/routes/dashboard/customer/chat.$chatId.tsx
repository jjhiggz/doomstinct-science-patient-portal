import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/customer/chat/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/customer/chat/$chatId"!</div>;
}
