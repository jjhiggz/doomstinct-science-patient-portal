import {
  createFileRoute,
  useLoaderData,
  useNavigate,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { SearchIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "remeda";
import { z } from "zod";
import { prisma } from "~/db";
import { useOnDebouncedState } from "~/hooks/useOnDebounced";
import { requireUserMiddleware } from "~/middleware/user.middleware";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "~/shadcn/components/ui/table";
import { validateWithZod } from "~/utils/validateWithZod";

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
  .handler(async ({ data }) => {
    const searchTerm = data?.search;
    if (!searchTerm) {
      return await prisma.user.findMany({
        where: {
          role: {
            equals: "PATIENT_SIDE",
          },
        },
        include: {
          CustomerData: true,
        },
        take: 20,
      });
    }
    return await prisma.user.findMany({
      where: {
        role: {
          equals: "PATIENT_SIDE",
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
      take: 20,
    });
  });

export const Route = createFileRoute("/dashboard/health-care/add-customer")({
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
    from: "/dashboard/health-care/add-customer",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useOnDebouncedState({
    handler: (searchTerm) => {
      navigate({
        from: "/dashboard/health-care/add-customer",
        search: {
          search: searchTerm,
        },
      });
    },
    watchState: searchTerm,
    time: 400,
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="customer-search" className="sr-only">
            Search Customers
          </label>
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <input
            id="customer-search"
            type="search"
            placeholder="Search customers..."
            className="px-3 py-2 border rounded-md w-full max-w-sm"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => {
                const customerData = customer.CustomerData;
                return (
                  <TableRow key={customerData?.id}>
                    <TableCell className="flex justify-center items-center">
                      <input type="checkbox" value={customer.id} />
                    </TableCell>
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
