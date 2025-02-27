import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import { Link, ToOptions } from "@tanstack/react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "~/shadcn/components/ui/sidebar";
import { useUser } from "~/hooks/useUser";
import { useNavigate } from "@tanstack/react-router";
import { match } from "ts-pattern";
import { toast } from "../hooks/use-toast";
import { Role } from "@prisma/client";

// This is sample data.

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();
  const profileLink = (
    {
      ADMIN: ".",
      PATIENT_SIDE: "/dashboard/customer/profile",
      HEALTH_SIDE: "/dashboard/health-care/profile",
    } satisfies Record<Role, ToOptions["to"]>
  )[props.forUserRole];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={profileLink}>
                <div className="flex justify-center items-center bg-sidebar-primary rounded-lg text-sidebar-primary-foreground aspect-square size-8">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{user.email}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {props.data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
