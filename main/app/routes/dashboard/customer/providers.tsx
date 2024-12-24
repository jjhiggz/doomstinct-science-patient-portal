import {
  createFileRoute,
  redirect,
  useLoaderData,
} from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/start";
import { MessageCircle } from "lucide-react";
import { z } from "zod";
import { prisma } from "~/db";
import { requireUserMiddleware } from "~/middleware/user.middleware";
import { Button } from "~/shadcn/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/shadcn/components/ui/table";
import { validateWithZod } from "~/utils/validateWithZod";

const $openChatRoom = createServerFn({ method: "POST" })
  .middleware([requireUserMiddleware])
  .validator(
    validateWithZod(
      z.object({
        providerId: z.string(),
      })
    )
  )
  .handler(async ({ data: { providerId }, context: { user } }) => {
    const existingChatroom = await prisma.chatRoom.findFirst({
      where: {
        AND: [
          {
            users: {
              some: { id: providerId },
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
        to: "/dashboard/customer/chat/$chatId",
        params: {
          chatId: existingChatroom.id,
        },
      });

    const newChatRoom = await prisma.chatRoom.create({
      data: {
        users: {
          connect: [{ id: user.id }, { id: providerId }],
        },
      },
    });

    throw redirect({
      to: "/dashboard/customer/chat/$chatId",
      params: {
        chatId: newChatRoom.id,
      },
    });
  });

const $getProviders = createServerFn({ method: "GET" })
  .middleware([requireUserMiddleware])
  .handler(async ({ context: { user } }) => {
    return await prisma.user.findMany({
      where: {
        role: "HEALTH_SIDE",
        providesHealthcareFor: {
          some: {
            id: user.id,
          },
        },
      },
      include: {
        ProviderData: true,
      },
    });
  });

export const Route = createFileRoute("/dashboard/customer/providers")({
  component: RouteComponent,
  loader: async () => {
    return {
      providers: await $getProviders(),
    };
  },
});

function RouteComponent() {
  const { providers } = useLoaderData({
    from: "/dashboard/customer/providers",
  });

  const openChatRoom = useServerFn($openChatRoom);

  if (providers.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-100 h-screen">
        <h1 className="mt-4 font-bold text-3xl text-gray-800">
          No healthcare providers found
        </h1>
        <p className="mt-2 text-gray-600">
          You don't have any healthcare providers assigned yet.
        </p>
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
                <TableHead>Specialties</TableHead>
                <TableHead>License Number</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => {
                const providerData = provider.ProviderData;
                return (
                  <TableRow key={providerData?.id}>
                    <TableCell>{provider?.email || "N/A"}</TableCell>
                    <TableCell>{providerData?.firstName || "N/A"}</TableCell>
                    <TableCell>{providerData?.lastName || "N/A"}</TableCell>
                    <TableCell>
                      {providerData?.specialties?.join(", ") || "N/A"}
                    </TableCell>
                    <TableCell>
                      {providerData?.licenseNumber || "N/A"}
                    </TableCell>
                    <TableCell>{providerData?.businessName || "N/A"}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          openChatRoom({
                            data: {
                              providerId: provider.id,
                            },
                          });
                        }}
                      >
                        <MessageCircle fill="white" />
                      </Button>
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
