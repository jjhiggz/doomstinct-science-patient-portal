import { AlertTriangle } from "lucide-react";
import { Button } from "~/shadcn/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 h-screen">
      <AlertTriangle className="w-16 h-16 text-red-500" />
      <h1 className="mt-4 font-bold text-3xl text-gray-800">Page Not Found</h1>
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button className="mt-6" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
