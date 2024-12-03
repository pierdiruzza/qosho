import { useState, useEffect } from "react";
import { Bell, Lock, Unlock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SpeedDisplay from "@/components/SpeedDisplay";
import QoshoToggle from "@/components/QoshoToggle";
import Navigation from "@/components/Navigation";

const Index = () => {
  const navigate = useNavigate();
  const [blockedAppsCount, setBlockedAppsCount] = useState(0);
  const [isDriving, setIsDriving] = useState(false);
  const [isQoshoEnabled, setIsQoshoEnabled] = useState(true);

  useEffect(() => {
    loadBlockedAppsCount();
  }, []);

  const loadBlockedAppsCount = async () => {
    const { count } = await supabase
      .from('blocked_apps')
      .select('*', { count: 'exact', head: true });
    
    setBlockedAppsCount(count || 0);
  };

  const onSpeedUpdate = (speed: number) => {
    setIsDriving(speed >= 20);
  };

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
              Welcome to Qosho
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
              <SpeedDisplay onSpeedUpdate={onSpeedUpdate} />
            </div>

            {/* App Group Section */}
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">App Group</h2>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base font-semibold">App Group</span>
                    <div className={`flex items-center gap-1 text-xs md:text-sm ${isDriving ? 'text-red-500' : 'text-green-500'}`}>
                      {isDriving ? (
                        <>
                          <Bell className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Blocked</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Unlocked</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/apps')}
                    className="bg-primary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                  >
                    MANAGE APPS
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Index;