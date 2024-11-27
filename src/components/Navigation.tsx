import { Home, Plus, Activity, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 pb-8 pt-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 ${
            isActive("/") ? "text-primary" : "text-gray-400"
          }`}
        >
          <Home className="w-6 h-6" strokeWidth={2} />
        </Link>
        
        <Link
          to="/apps"
          className={`flex flex-col items-center gap-1 ${
            isActive("/apps") ? "text-primary" : "text-gray-400"
          }`}
        >
          <Activity className="w-6 h-6" strokeWidth={2} />
        </Link>

        <button 
          className="bg-primary rounded-full p-4 -mt-8 shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Add new"
        >
          <Plus className="w-6 h-6 text-white" strokeWidth={2} />
        </button>

        <Link
          to="/dashboard"
          className={`flex flex-col items-center gap-1 ${
            isActive("/dashboard") ? "text-primary" : "text-gray-400"
          }`}
        >
          <Activity className="w-6 h-6" strokeWidth={2} />
        </Link>

        <button
          className="flex flex-col items-center gap-1 text-gray-400"
          aria-label="User menu"
        >
          <User className="w-6 h-6" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default Navigation;