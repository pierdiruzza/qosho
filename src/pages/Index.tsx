import { useSessionContext } from "@supabase/auth-helpers-react";
import SpeedDisplay from "@/components/SpeedDisplay";
import AppBlockList from "@/components/AppBlockList";
import QoshoToggle from "@/components/QoshoToggle";
import Navigation from "@/components/Navigation";

const Index = () => {
  const { session } = useSessionContext();
  const userName = session?.user?.user_metadata?.full_name?.split(" ")[0] || "User";

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              Hi, {userName}
              <span role="img" aria-label="wave">👋</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Let's make the road a safer place!
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
            <span role="img" aria-label="angel" className="text-2xl">😇</span>
          </div>
        </div>

        {/* Active Qosho Toggle */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Active Qosho</h2>
          <QoshoToggle />
        </div>

        {/* Speed Display */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Your current speed</h2>
          <SpeedDisplay />
        </div>

        {/* Blocked Apps */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Blocked Apps</h2>
          <AppBlockList editable={false} />
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;