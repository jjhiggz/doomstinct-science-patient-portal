import { Message } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useLoaderData,
  useParams,
} from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/start";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { pipe, uniqueBy } from "remeda";
import { z } from "zod";
import { prisma } from "~/db";
import { useUser } from "~/hooks/useUser";
import { requireUserMiddleware } from "~/middleware/user.middleware";
import { Input } from "~/shadcn/components/ui/input";
import { cn } from "~/shadcn/utils/classnames";
import { validateWithZod } from "~/utils/validateWithZod";

const $createMessage = createServerFn({ method: "POST" })
  .middleware([requireUserMiddleware])
  .validator(
    validateWithZod(
      z.object({
        roomId: z.string(),
        content: z.string(),
      })
    )
  )
  .handler(async ({ data: { roomId, content }, context: { user } }) => {
    const message = await prisma.message.create({
      data: {
        content,
        userId: user.id,
        roomId,
      },
      include: {
        from: true,
      },
    });

    return message;
  });
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

const $getRecentMessages = createServerFn({ method: "POST" })
  .middleware([requireUserMiddleware])
  .validator(
    validateWithZod(
      z.object({
        roomId: z.string(),
      })
    )
  )
  .handler(async ({ data: { roomId }, context: { user } }) => {
    const messages = await prisma.message
      .findMany({
        where: {
          roomId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      })
      .then((input) => input.reverse());

    if (!messages) {
      return [];
    }

    return messages;
  });

export const Route = createFileRoute("/dashboard/health-care/chat/$chatId")({
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
    from: "/dashboard/health-care/chat/$chatId",
  });
  const [allMessages, setAllMessages] = useState<Message[]>(messages);

  const user = useUser();
  const { chatId } = useParams({ from: "/dashboard/health-care/chat/$chatId" });
  const getRecentMessages = useServerFn($getRecentMessages);
  const createMessage = useServerFn($createMessage);

  useEffect(() => {
    const interval = setInterval(() => {
      getRecentMessages({
        data: {
          roomId: chatId,
        },
      }).then((newMessages) => {
        setAllMessages((allMessages) =>
          uniqueBy([...allMessages, ...newMessages], (m) => m.id)
        );
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const customer = users.find((user) => user.role === "PATIENT_SIDE");

  return (
    <div className="flex flex-col gap-4 lg:px-32 p-4">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold">Chatting With:</h2>
        <div className="flex gap-2">
          <div className="bg-gray-300 w-px h-6" />
          <div className="flex flex-col text-gray-600 text-sm">
            <div className="font-medium">{customer?.email}</div>
            <div>
              {customer?.CustomerData?.firstName}{" "}
              {customer?.CustomerData?.lastName}
            </div>
          </div>
        </div>
      </div>
      {allMessages.map((message) => {
        const messageOwner = message.userId === user.id ? user : customer;
        const belongsToMe = messageOwner?.id === user.id;

        return (
          <div
            key={message.id}
            className={cn(`flex `, {
              "justify-end": belongsToMe,
              "justify-start": !belongsToMe,
            })}
          >
            <div
              className={`max-w-[70%] rounded-2xl p-4 ${
                belongsToMe
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div className="mb-1 font-semibold text-sm">
                {messageOwner?.email}
              </div>
              <div>{message.content}</div>
              <div className="opacity-70 mt-1 text-xs">
                {message.createdAt.toLocaleTimeString()}
              </div>
            </div>
          </div>
        );
      })}
      <form
        className="flex gap-2 lg:w-1/2"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const content = (formData.get("content") as string) ?? "";
          if (content) {
            // Submit form data
            e.currentTarget.reset();
          }
          createMessage({
            data: {
              content,
              roomId: chatId,
            },
          });
        }}
      >
        <PlusCircle className="h-full cursor-pointer fill-slate-300 stroke-slate-600" />
        <Input name="content" />
      </form>
    </div>
  );
}
