import {
  createFileRoute,
  useNavigate,
  ToOptions,
  Link,
} from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/customer/")({
  component: RouteComponent,
});
const links = [
  {
    title: "Providers",
    description: "Communicate with your healthcare team",
    action: "Send Message",
    to: "/dashboard/customer/providers",
  },
  {
    title: "Pets",
    description: "See the pets of yours that are in our system",
    action: "🐶 🐱 🐰 🐹",
    to: "/dashboard/customer/providers",
  },
] satisfies {
  title: string;
  description: string;
  action: string;
  to: ToOptions["to"];
}[];

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {links.map(({ title, description, action, to }) => (
        <div key={title} className="bg-white shadow p-6 rounded-lg">
          <h3 className="mb-2 font-semibold text-lg">{title}</h3>
          <p className="mb-4 text-gray-600">{description}</p>
          <Link to={to}>
            <button className="bg-primary hover:bg-primary/90 px-4 py-2 rounded text-primary-foreground">
              {action}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
