import {
  createFileRoute,
  useLoaderData,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/start";
import { SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { z } from "zod";
import { prisma } from "~/db";
import { useOnDebouncedState } from "~/hooks/useOnDebounced";
import { requireUserMiddleware } from "~/middleware/user.middleware";
import { Button } from "~/shadcn/components/ui/button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "~/shadcn/components/ui/table";
import { toast } from "~/shadcn/hooks/use-toast";
import { validateWithZod } from "~/utils/validateWithZod";

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
            none: {
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
          none: {
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

const $addCustomers = createServerFn({ method: "POST" })
  .middleware([requireUserMiddleware])
  .validator(validateWithZod(z.array(z.string())))
  .handler(({ data, context }) => {
    return prisma.$transaction(
      data.map((customerId) =>
        prisma.user.update({
          where: {
            id: customerId,
          },
          data: {
            healthcareProvidedBy: {
              connect: {
                id: context.user.id,
              },
            },
          },
        })
      )
    );
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

  const [customerSet, setCustomerSet] = useState<Set<string>>(new Set());

  const navigate = useNavigate();
  const router = useRouter();
  const addCustomers = useServerFn($addCustomers);

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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Process the selected customers
      const selectedCustomers = Array.from(customerSet);
      addCustomers({ data: selectedCustomers })
        .then(() => {
          toast({ title: "Added 😊", variant: "success" });
          router.invalidate();
        })
        .catch(() => {
          toast({ title: "Something went wrong 😞", variant: "destructive" });
          router.invalidate();
        });

      // Add your form submission logic here
    },
    [customerSet]
  );

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
        <form onSubmit={handleSubmit}>
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
                        <input
                          type="checkbox"
                          value={customer.id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              customerSet.add(customer.id);
                              setCustomerSet(customerSet);
                            } else {
                              customerSet.delete(customer.id);
                              setCustomerSet(customerSet);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>{customer?.email || "N/A"}</TableCell>
                      <TableCell>{customerData?.firstName || "N/A"}</TableCell>
                      <TableCell>{customerData?.lastName || "N/A"}</TableCell>
                      <TableCell>{customerData?.address || "N/A"}</TableCell>
                      <TableCell>{customerData?.phone || "N/A"}</TableCell>
                      <TableCell>
                        {customerData?.preferences || "N/A"}
                      </TableCell>
                      <TableCell>
                        {customerData?.billingInfo || "N/A"}
                      </TableCell>
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

          <Button className="mt-5 w-48">Add Customers</Button>
        </form>
      </div>
    </div>
  );
}
