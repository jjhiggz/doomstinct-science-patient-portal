import { prisma } from "~/db";

const id = "cm51bhehb000035455f2lw91w";
// prisma
// .user
//   .findUniqueOrThrow({
//     where: { id: "cm51bhehb000035455f2lw91w" },
//     select: {
//       id: true,
//       email: true,
//       createdAt: true,
//       updatedAt: true,
//       ProviderData: true,
//     },
//   })
//   .then(console.log);

const allUsers = prisma.user
  .findMany()
  .then((users) =>
    users.map((user) => {
      return user.id;
    })
  )
  .then(console.log);
