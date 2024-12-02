import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeedDisplay from "@/components/SpeedDisplay";
import QoshoToggle from "@/components/QoshoToggle";
import AppBlockList from "@/components/AppBlockList";
import Navigation from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const userName = session?.user?.user_metadata?.full_name?.split(" ")[0] || "User";
  const [isQoshoEnabled, setIsQoshoEnabled] = useState(true);

  const handleToggleChange = (enabled: boolean) => {
    setIsQoshoEnabled(enabled);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              Hi, {userName}
              <span role="img" aria-label="wave">👋</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500">
              Let's make the road a safer place!
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            <span role="img" aria-label="angel" className="text-2xl">😇</span>
          </div>
        </div>

        {/* Active Qosho Toggle */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Active Qosho</h2>
          <QoshoToggle onToggleChange={handleToggleChange} />
        </div>

        {isQoshoEnabled && (
          <>
            {/* Speed Display */}
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Your current speed</h2>
              <SpeedDisplay />
            </div>

            {/* Blocked Apps */}
            <AppBlockList />
          </>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Index;