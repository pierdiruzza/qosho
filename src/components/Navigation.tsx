import { Home, AppWindow, LineChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary" : "text-gray-400";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
      <div className="max-w-md mx-auto flex justify-evenly items-center">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 ${isActive("/")}`}
        >
          <Home className="w-6 h-6" />
        </Link>
        <Link
          to="/apps"
          className={`flex flex-col items-center gap-1 ${isActive("/apps")}`}
        >
          <AppWindow className="w-6 h-6" />
        </Link>
        <Link
          to="/dashboard"
          className={`flex flex-col items-center gap-1 ${isActive("/dashboard")}`}
        >
          <LineChart className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default Navigation;