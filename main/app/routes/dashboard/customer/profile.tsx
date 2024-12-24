import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { prisma } from "~/db";
import { requireUserMiddleware } from "~/middleware/user.middleware";
import { useLoaderData } from "@tanstack/react-router";
import { Input } from "~/shadcn/components/ui/input";

const $getUserProfile = createServerFn()
  .middleware([requireUserMiddleware])
  .handler(async ({ context: { user } }) => {
    return await prisma.user.findUniqueOrThrow({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        CustomerData: true,
      },
    });
  });

export const Route = createFileRoute("/dashboard/customer/profile")({
  component: RouteComponent,
  loader: async () => {
    return {
      user: await $getUserProfile(),
    };
  },
});

function RouteComponent() {
  const { user } = useLoaderData({
    from: "/dashboard/customer/profile",
  });

  return (
    <div className="p-4">
      <div className="bg-white shadow mx-auto p-6 rounded-lg w-full max-w-4xl overflow-hidden">
        <form className="space-y-4">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                User ID
              </label>
              <div className="border-gray-300 bg-gray-100 mt-1 p-2 border rounded-md cursor-not-allowed">
                {user.id}
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Email
              </label>
              <Input
                type="email"
                value={user.email}
                readOnly
                className="mt-1"
              />
            </div>
          </div>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Created At
              </label>
              <Input
                type="text"
                value={new Date(user.createdAt).toLocaleString()}
                readOnly
                className="mt-1"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Updated At
              </label>
              <Input
                type="text"
                value={new Date(user.updatedAt).toLocaleString()}
                readOnly
                className="mt-1"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
