
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-amazon-primary text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          We couldn't find the page you're looking for.
        </p>
        <div className="space-y-4">
          <p className="text-gray-500">
            The page might have been moved, deleted, or never existed.
          </p>
          <Link to="/">
            <Button className="bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
