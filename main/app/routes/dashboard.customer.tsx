import { Separator } from "@radix-ui/react-separator";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { CustomerSidebar } from "~/shadcn/components/customer-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/shadcn/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/shadcn/components/ui/sidebar";

export const Route = createFileRoute("/dashboard/customer")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <CustomerSidebar />
      <SidebarInset>
        <header className="flex items-center gap-2 border-b h-16 shrink-0">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="md:block hidden">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="md:block hidden" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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