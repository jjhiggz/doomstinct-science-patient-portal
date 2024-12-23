import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { prisma } from '~/db'
import { requireUserMiddleware } from '~/middleware/user.middleware'

const $getUserData = createServerFn()
  .middleware([requireUserMiddleware])
  .handler(async ({ context: { user } }) => {
    return await prisma.providerData.findFirst({
      where: {
        userId: user.id,
      },
    })
  })

export const Route = createFileRoute('/dashboard/health-care/user')({
  component: RouteComponent,
  loader: async () => {
    return $getUserData()
  },
})

function RouteComponent() {
  const data = useLoaderData({ from: '/dashboard/health-care/user' })

  return (
    <div className="p-4">
      <div className="bg-white shadow mx-auto rounded-lg w-full max-w-4xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 font-semibold text-gray-600 text-left text-sm">
                Field
              </th>
              <th className="px-6 py-3 font-semibold text-gray-600 text-left text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data || {}).map(([key, value], index) => (
              <tr
                key={key}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-6 py-4 text-gray-500 text-sm capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </td>
                <td className="px-6 py-4 text-gray-900 text-sm">
                  {Array.isArray(value)
                    ? value.join(', ')
                    : typeof value === 'boolean'
                      ? value
                        ? 'Yes'
                        : 'No'
                      : value?.toString() || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
