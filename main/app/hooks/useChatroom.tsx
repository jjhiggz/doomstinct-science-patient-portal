import { Message } from "@prisma/client";
import { Channel, Socket } from "phoenix";
import { useCallback, useEffect, useRef, useState } from "react";
import { match } from "ts-pattern";

const makeSocket = () => new Socket("ws://localhost:4000/socket");

import { z } from "zod";

const dateSchema = z.preprocess(
  (arg) => (typeof arg === "string" ? new Date(arg) : arg),
  z.date()
);

const messageSchema = z.object({
  id: z.string(),
  createdAt: dateSchema,
  updatedAt: dateSchema,
  content: z.string(),
  userId: z.string(),
  roomId: z.string().nullable(),
});

type PushMessage =
  | {
      event: "message";
      payload: Message;
    }
  | {
      event: "user-typing";
      payload: {
        byUserId: string;
      };
    }
  | {
      event: "user-typing-stop";
      payload: {
        byUserId: string;
      };
    };

export const useChatRoom = ({
  roomId,
  initialMessages,
}: {
  roomId: string;
  initialMessages: Message[];
}) => {
  const socketRef = useRef<ReturnType<typeof makeSocket>>();
  const channel = useRef<Channel>();
  const dispatch = useCallback((pushMessage: PushMessage) => {
    channel.current?.push(pushMessage.event, pushMessage.payload);
  }, []);

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [typingUserId, setTypingUserId] = useState<string | null>(null);

  useEffect(() => {
    const socket = new Socket("ws://localhost:4000/socket");

    socket.connect();
    socket.onMessage((e) => {
      match(e as PushMessage)
        .with({ event: "message" }, (e) => {
          setMessages((m) => [...m, messageSchema.parse(e.payload)]);
        })
        .with({ event: "user-typing" }, (e) => {
          e;
        })
        .with({ event: "user-typing-stop" }, (e) => {
          e;
        })
        .otherwise(() => {});
    });
    channel.current = socket.channel(`chat_room:${roomId}`);

    channel.current
      .join(1000)
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
        console.log(resp);
      })
      .receive("timeout", () => {
        console.error("Timed Out");
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
      });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    socketRef,
    channel,
    dispatch,
    messages,
    setMessages,
  };
};
