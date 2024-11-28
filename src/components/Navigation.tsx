import { Home, Plus, LineChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-6">
      <div className="max-w-md mx-auto flex justify-between items-center bg-gray-100 p-3 rounded-full">
        <Link
          to="/"
          className={`p-2 rounded-full ${
            isActive("/") ? "bg-blue-600 text-white" : "text-gray-400"
          }`}
        >
          <Home className="w-6 h-6" />
        </Link>
        <Link
          to="/apps"
          className={`p-2 rounded-full ${
            isActive("/apps") ? "bg-blue-600 text-white" : "text-gray-400"
          }`}
        >
          <Plus className="w-6 h-6" />
        </Link>
        <Link
          to="/dashboard"
          className={`p-2 rounded-full ${
            isActive("/dashboard") ? "bg-blue-600 text-white" : "text-gray-400"
          }`}
        >
          <LineChart className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default Navigation;