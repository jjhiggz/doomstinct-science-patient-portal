import { Separator } from "@radix-ui/react-separator";
import { createFileRoute } from "@tanstack/react-router";
import { DashboardBreadcrumbList } from "~/shadcn/components/dashboard-breadcrumb-list";
import { DashboardSidebar } from "~/shadcn/components/dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/shadcn/components/ui/sidebar";

export const Route = createFileRoute("/dashboard/health-care")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <DashboardSidebar
        data={{
          navMain: [
            {
              title: "Customers",
              url: "",
              items: [
                {
                  title: "Add new Customer",
                  url: "",
                },
                {
                  title: "Edit Customer",
                  url: "",
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
              url: "",
              items: [
                {
                  title: "Revenue Overview",
                  url: "",
                },
                {
                  title: "Billing & Invoices",
                  url: "",
                },
                {
                  title: "Insurance Claims",
                  url: "",
                },
                {
                  title: "Expense Tracking",
                  url: "",
                },
                {
                  title: "Financial Reports",
                  url: "",
                },
              ],
            },
            {
              title: "Messages",
              url: "",
              items: [],
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
        </header>
        <div className="flex flex-col flex-1 gap-4 p-4">
          <div className="gap-4 grid md:grid-cols-3 auto-rows-min">
            <div className="bg-muted/50 rounded-xl aspect-video" />
            <div className="bg-muted/50 rounded-xl aspect-video" />
            <div className="bg-muted/50 rounded-xl aspect-video" />
          </div>
          <div className="flex-1 bg-muted/50 rounded-xl min-h-[100vh] md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
