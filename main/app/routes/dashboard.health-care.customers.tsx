import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { useLoaderData } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { prisma } from "~/db";
import { requireUserMiddleware } from "~/middleware/user.middleware";
import { validateWithZod } from "~/utils/validateWithZod";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/shadcn/components/ui/table";
import { Button } from "~/shadcn/components/ui/button";
import NotFound from "~/shadcn/components/not-found";

const pageSize = 10;

const $findCustomers = createServerFn({ method: "POST" })
  .middleware([requireUserMiddleware])
  .validator(
    validateWithZod(
      z
        .object({
          search: z.string().optional(),
        })
        .optional()
    )
  )
  .handler(async ({ data, context: { user } }) => {
    const searchTerm = data?.search;
    if (!searchTerm) {
      return await prisma.user.findMany({
        where: {
          role: {
            equals: "PATIENT_SIDE",
          },
          healthcareProvidedBy: {
            some: {
              id: user.id,
            },
          },
        },
        include: {
          CustomerData: true,
        },
        take: pageSize,
      });
    }
    return await prisma.user.findMany({
      where: {
        role: {
          equals: "PATIENT_SIDE",
        },
        healthcareProvidedBy: {
          some: {
            id: user.id,
          },
        },
        OR: [
          { email: { contains: searchTerm } },
          {
            CustomerData: {
              firstName: { contains: searchTerm },
            },
          },
          {
            CustomerData: {
              lastName: { contains: searchTerm },
            },
          },
        ],
      },
      include: {
        CustomerData: true,
      },
      take: pageSize,
    });
  });

export const Route = createFileRoute("/dashboard/health-care/customers")({
  component: RouteComponent,
  validateSearch: (search) => {
    return z.object({ search: z.string().optional() }).optional().parse(search);
  },
  loaderDeps: (search) => search,
  loader: async ({ deps: { search } }) => {
    return {
      customers: await $findCustomers({
        data: {
          search: search?.search,
        },
      }),
    };
  },
});

function RouteComponent() {
  const { customers } = useLoaderData({
    from: "/dashboard/health-care/customers",
  });

  const navigate = useNavigate();

  if (customers.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-100 h-screen">
        <h1 className="mt-4 font-bold text-3xl text-gray-800">
          No customer is found
        </h1>
        <p className="mt-2 text-gray-600">
          It looks like there are no customers in the system.
        </p>
        <Link className="mt-6" to="/dashboard/health-care/add-customer">
          Add Customers
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Preferences</TableHead>
                <TableHead>Billing Info</TableHead>
                <TableHead>Timezone</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Marketing</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => {
                const customerData = customer.CustomerData;
                return (
                  <TableRow key={customerData?.id}>
                    <TableCell>{customer?.email || "N/A"}</TableCell>
                    <TableCell>{customerData?.firstName || "N/A"}</TableCell>
                    <TableCell>{customerData?.lastName || "N/A"}</TableCell>
                    <TableCell>{customerData?.address || "N/A"}</TableCell>
                    <TableCell>{customerData?.phone || "N/A"}</TableCell>
                    <TableCell>{customerData?.preferences || "N/A"}</TableCell>
                    <TableCell>{customerData?.billingInfo || "N/A"}</TableCell>
                    <TableCell>{customerData?.timezone || "N/A"}</TableCell>
                    <TableCell>{customerData?.language || "N/A"}</TableCell>
                    <TableCell>
                      {customerData?.marketing ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/dashboard/health-care/customers/${customer.id}`}
                        className="button"
                      >
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
