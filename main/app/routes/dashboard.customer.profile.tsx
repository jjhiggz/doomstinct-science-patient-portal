import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/customer/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/customer/profile"!</div>
}
