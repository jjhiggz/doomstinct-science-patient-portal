import { Separator } from "@radix-ui/react-separator";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DashboardBreadcrumbList } from "~/shadcn/components/dashboard-breadcrumb-list";
import { DashboardSidebar } from "~/shadcn/components/dashboard-sidebar";
import { Button } from "~/shadcn/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/shadcn/components/ui/sidebar";

export const Route = createFileRoute("/dashboard/health-care")({
  component: RouteComponent,
  loader: ({ context }) => {
    if (context.user.role === "PATIENT_SIDE")
      throw redirect({ to: "/dashboard/customer" });
  },
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <DashboardSidebar
        forUserRole="HEALTH_SIDE"
        data={{
          navMain: [
            {
              title: "Customers",
              url: "/dashboard/health-care/customers",
              items: [
                {
                  title: "Add new Customer",
                  url: "/dashboard/health-care/add-customer",
                },
              ],
            },
            {
              title: "Patients",
              url: "",
              items: [
                {
                  title: "Add new Patient",
                  url: "",
                },
                {
                  title: "Edit Patient",
                  url: "",
                },
              ],
            },
            {
              title: "Financials",
              url: "/dashboard/health-care/financials",
            },
          ],
        }}
      />

      <SidebarInset>
        <header className="flex items-center gap-2 border-b h-16 shrink-0">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashboardBreadcrumbList />
          </div>
          <a href="/logout" className="flex flex-1 justify-end px-10">
            <Button>Logout</Button>
          </a>
        </header>
        <div className="flex flex-col flex-1 gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
