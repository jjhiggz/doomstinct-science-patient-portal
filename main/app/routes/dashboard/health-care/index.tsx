import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/health-care/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {[
        {
          title: 'Add Customer',
          description: 'Add a customer to your account',
          action: 'Add a Customer',
        },
        {
          title: 'Patient Records',
          description: 'View and update patient medical records',
          action: 'View Records',
        },
        {
          title: 'Prescriptions',
          description: 'Manage and renew prescriptions',
          action: 'Manage Prescriptions',
        },
        {
          title: 'Lab Results',
          description: 'Access laboratory test results and reports',
          action: 'View Results',
        },
        {
          title: 'Billing & Payments',
          description: 'Review bills and make payments',
          action: 'Pay Now',
        },
        {
          title: 'Messages',
          description: 'Communicate with your healthcare team',
          action: 'Send Message',
        },
      ].map(({ title, description, action }) => (
        <div key={title} className="bg-white shadow p-6 rounded-lg">
          <h3 className="mb-2 font-semibold text-lg">{title}</h3>
          <p className="mb-4 text-gray-600">{description}</p>
          <button className="bg-primary hover:bg-primary/90 px-4 py-2 rounded text-primary-foreground">
            {action}
          </button>
        </div>
      ))}
    </div>
  )
}
