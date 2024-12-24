import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/health-care/financials")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-[50vh]">
      <h1 className="font-bold text-4xl text-gray-800">Coming Soon</h1>
      <p className="max-w-md text-center text-gray-600">
        We're working hard to bring you a comprehensive financial management
        system. Check back soon!
      </p>
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <div className="bg-primary rounded-full w-2 h-2 animate-pulse" />
        <span>In Development</span>
      </div>
    </div>
  );
}
