import { useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";

const capitalize = (input: string) =>
  input
    .split("")
    .map((n, i) => (i === 0 ? n.toUpperCase() : n.toLowerCase()))
    .join("");
const normalize = (subpath: string) => {
  return subpath
    .split("-")
    .map((n) => capitalize(n))
    .join("");
};

export const DashboardBreadcrumbList = () => {
  const location = useLocation();
  const pathsRaw = location.pathname
    .split("/")
    .filter((n) => n.trim().length > 0 && !n.includes("dashboard"));

  const paths = pathsRaw.map(normalize);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <React.Fragment key={path}>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/dashboard/${pathsRaw[0]}/${location.pathname
                  .split("/")
                  .slice(3, index + 3)
                  .join("/")}`}
              >
                {path}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
