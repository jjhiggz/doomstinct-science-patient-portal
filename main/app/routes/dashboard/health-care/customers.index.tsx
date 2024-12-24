import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { useLoaderData } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/start";
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
import { MessageCircle, MessageCircleCode } from "lucide-react";

const pageSize = 10;

const $openChatRoom = createServerFn({ method: "POST" })
  .middleware([requireUserMiddleware])
  .validator(
    validateWithZod(
      z.object({
        customerId: z.string(),
      })
    )
  )
  .handler(async ({ data: { customerId }, context: { user } }) => {
    const existingChatroom = await prisma.chatRoom.findFirst({
      where: {
        AND: [
          {
            users: {
              some: { id: customerId },
            },
          },
          {
            users: {
              some: { id: user.id },
            },
          },
        ],
      },
    });

    if (existingChatroom)
      throw redirect({
        to: "/dashboard/health-care/chat/$chatId",
        params: {
          chatId: existingChatroom.id,
        },
      });

    const newChatRoom = await prisma.chatRoom.create({
      data: {
        users: {
          connect: [{ id: user.id }, { id: customerId }],
        },
      },
    });

    throw redirect({
      to: "/dashboard/health-care/chat/$chatId",
      params: {
        chatId: newChatRoom.id,
      },
    });
  });
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

export const Route = createFileRoute("/dashboard/health-care/customers/")({
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
    from: "/dashboard/health-care/customers/",
  });

  const openChat = useServerFn($openChatRoom);

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
                    <TableCell>
                      <Button
                        onClick={() => {
                          openChat({
                            data: {
                              customerId: customer.id,
                            },
                          });
                        }}
                      >
                        <MessageCircle fill="white" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/dashboard/health-care/customers/$customerId`}
                        params={{
                          customerId: customer.id,
                        }}
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
          <Outlet />
        </div>
      </div>
    </div>
  );
}
