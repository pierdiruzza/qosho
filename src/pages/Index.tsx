import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import { Bell, Lock, Unlock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SpeedDisplay from "@/components/SpeedDisplay";
import QoshoToggle from "@/components/QoshoToggle";
import Navigation from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const userName = session?.user?.user_metadata?.full_name?.split(" ")[0] || "User";
  const [blockedAppsCount, setBlockedAppsCount] = useState(0);
  const [isDriving, setIsDriving] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      loadBlockedAppsCount();
    }
  }, [session?.user?.id]);

  const loadBlockedAppsCount = async () => {
    const { count } = await supabase
      .from('blocked_apps')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session?.user?.id);
    
    setBlockedAppsCount(count || 0);
  };

  // This callback will be called by SpeedDisplay to update driving status
  const onSpeedUpdate = (speed: number) => {
    setIsDriving(speed >= 20);
  };

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
          <SpeedDisplay onSpeedUpdate={onSpeedUpdate} />
        </div>

        {/* Blocked Apps */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Blocked Apps</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">App Group</span>
                <div className={`flex items-center gap-1 text-sm ${isDriving ? 'text-red-500' : 'text-green-500'}`}>
                  {isDriving ? (
                    <>
                      <Bell className="w-4 h-4" />
                      <span>Blocked</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Unlocked</span>
                    </>
                  )}
                </div>
              </div>
              <button 
                onClick={() => navigate('/apps')}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                MANAGE APPS
              </button>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;