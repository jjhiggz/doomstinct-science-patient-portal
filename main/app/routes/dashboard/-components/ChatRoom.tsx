import { Message } from "@prisma/client";
import { useServerFn } from "@tanstack/start";
import { useChatRoom } from "~/hooks/useChatroom";
import { ClientUser } from "~/routes/(auth)/-helpers/auth-schemas";
import { cn } from "~/shadcn/utils/classnames";
import { $createMessage } from "../-server-fns/$create-message";
import { PlusCircle } from "lucide-react";
import { Input } from "~/shadcn/components/ui/input";
import { useState } from "react";
import { useOnDebouncedState } from "~/hooks/useOnDebounced";

export const ChatRoom = ({
  firstName,
  lastName,
  email,
  initialMessages,
  chatId,
  activeUser,
}: {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string;
  initialMessages: Message[];
  chatId: string;
  activeUser: ClientUser;
}) => {
  const {
    dispatch,
    messages: allMessages,
    usersTyping,
  } = useChatRoom({
    initialMessages: initialMessages,
    roomId: chatId,
  });

  const [content, setContent] = useState("");

  const createMessage = useServerFn($createMessage);

  useOnDebouncedState({
    handler: (content) => {
      if (content.length === 0) {
        return dispatch({
          event: "user-typing-stop",
          payload: {
            byUserId: activeUser.id,
          },
        });
      }
      return dispatch({
        event: "user-typing",
        payload: {
          byUserId: activeUser.id,
        },
      });
    },
    time: 100,
    watchState: content,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMessage({
      data: {
        content,
        roomId: chatId,
      },
    }).then((message) => {
      dispatch({
        event: "message",
        payload: message,
      });
    });
  };

  const isOtherUserTyping = usersTyping.some((id) => id !== activeUser?.id);

  return (
    <div className="flex flex-col gap-4 lg:px-32 p-4">
      <div className="flex items-center gap-2">
        <h2 className="font-semibold">Chatting With:</h2>
        <div className="flex gap-2">
          <div className="bg-gray-300 w-px h-6" />
          <div className="flex flex-col text-gray-600 text-sm">
            <div className="font-medium">{email}</div>
            <div>
              {firstName} {lastName}
            </div>
          </div>
        </div>
      </div>
      {allMessages.map((message) => {
        const messageOwner =
          message.userId === activeUser.id ? activeUser : null;
        const belongsToMe = messageOwner?.id === activeUser.id;

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
      {isOtherUserTyping && (
        <div className="text-gray-500 text-sm italic">
          The other user is typing...
          {/* {JSON.stringify({ usersTyping })} */}
        </div>
      )}
      <form className="flex gap-2 lg:w-1/2" onSubmit={handleSubmit}>
        <PlusCircle className="h-full cursor-pointer fill-slate-300 stroke-slate-600" />
        <Input
          name="content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </form>
    </div>
  );
};
