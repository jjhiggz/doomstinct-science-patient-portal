import { createServerFn } from "@tanstack/start";
import { z } from "zod";
import { prisma } from "~/db";
import { requireUserMiddleware } from "~/middleware/user.middleware";
import { validateWithZod } from "~/utils/validateWithZod";

export const $createMessage = createServerFn({ method: "POST" })
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
