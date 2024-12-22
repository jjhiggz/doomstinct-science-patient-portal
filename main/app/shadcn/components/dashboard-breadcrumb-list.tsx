import { useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { ReactNode } from "react";

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
  const paths = location.pathname
    .split("/")
    .filter((n) => n.trim().length > 0 && n !== "dashboard")
    .map(normalize);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.reduce((acc, el, i) => {
          if (i < paths.length - 1) {
            return [
              ...acc,
              ...[
                <BreadcrumbItem key={el} />,
                <BreadcrumbLink key={el} href="#">
                  {el}
                </BreadcrumbLink>,
                <BreadcrumbSeparator />,
              ],
            ];
          } else {
            return [
              ...acc,
              ...[
                <BreadcrumbItem key={el} />,
                <BreadcrumbLink key={el} href="#">
                  {el}
                </BreadcrumbLink>,
              ],
            ];
          }
        }, [] as ReactNode[])}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
