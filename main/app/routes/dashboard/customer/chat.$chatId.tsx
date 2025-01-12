import {
  createFileRoute,
  useLoaderData,
  useParams,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { z } from "zod";
import { prisma } from "~/db";
import { useUser } from "~/hooks/useUser";
import { requireUserMiddleware } from "~/middleware/user.middleware";
import { validateWithZod } from "~/utils/validateWithZod";
import { ChatRoom } from "../-components/ChatRoom";

const $getRoomData = createServerFn({ method: "POST" })
  .middleware([requireUserMiddleware])

  .validator(
    validateWithZod(
      z.object({
        roomId: z.string(),
      })
    )
  )
  .handler(async ({ data: { roomId }, context: { user } }) => {
    const room = await prisma.chatRoom.findUnique({
      where: {
        id: roomId,
        users: {
          some: {
            id: user.id,
          },
        },
      },
      include: {
        messages: {
          include: {
            from: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        users: {
          include: {
            ProviderData: true,
            CustomerData: true,
          },
        },
      },
    });

    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  });

export const Route = createFileRoute("/dashboard/customer/chat/$chatId")({
  loader: async ({ params: { chatId } }) => {
    const chatRoomData = await $getRoomData({
      data: {
        roomId: chatId,
      },
    });

    return chatRoomData;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { users, messages } = useLoaderData({
    from: "/dashboard/customer/chat/$chatId",
  });

  const user = useUser();
  const { chatId } = useParams({ from: "/dashboard/customer/chat/$chatId" });

  const customer = users.find((user) => user.role === "PATIENT_SIDE");

  return (
    <ChatRoom
      firstName={customer?.CustomerData?.firstName}
      lastName={customer?.CustomerData?.lastName}
      email={customer?.email ?? ""}
      initialMessages={messages}
      chatId={chatId}
      activeUser={user}
    />
  );
}
