import { Home, Apps, LineChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary" : "text-gray-500";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 ${isActive("/")}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/apps"
          className={`flex flex-col items-center gap-1 ${isActive("/apps")}`}
        >
          <Apps className="w-6 h-6" />
          <span className="text-xs">Apps</span>
        </Link>
        <Link
          to="/dashboard"
          className={`flex flex-col items-center gap-1 ${isActive("/dashboard")}`}
        >
          <LineChart className="w-6 h-6" />
          <span className="text-xs">Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;