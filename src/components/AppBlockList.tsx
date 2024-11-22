import { useState, useEffect } from 'react';
import { Shield, Check } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const AppBlockList = () => {
  const [blockedApps, setBlockedApps] = useState([
    { id: 1, name: 'Instagram', blocked: false },
    { id: 2, name: 'TikTok', blocked: false },
    { id: 3, name: 'Facebook', blocked: false },
    { id: 4, name: 'Games', blocked: false },
    { id: 5, name: 'YouTube', blocked: false },
    { id: 6, name: 'Twitter', blocked: false },
  ]);

  const [isDriving, setIsDriving] = useState(false);

  // Simulate speed monitoring and auto-block apps
  useEffect(() => {
    const checkSpeed = () => {
      // In a real app, this would use device sensors
      const currentSpeed = Math.random() * 60;
      const isOverSpeedLimit = currentSpeed > 30;
      
      if (isOverSpeedLimit !== isDriving) {
        setIsDriving(isOverSpeedLimit);
        if (isOverSpeedLimit) {
          closeBlockedApps();
        }
      }
    };

    const interval = setInterval(checkSpeed, 2000);
    return () => clearInterval(interval);
  }, [isDriving]);

  const closeBlockedApps = () => {
    const appsToClose = blockedApps.filter(app => app.blocked).map(app => app.name);
    if (appsToClose.length > 0) {
      toast.info(`Closing apps: ${appsToClose.join(', ')}`);
    }
  };

  const toggleApp = (id: number) => {
    setBlockedApps(apps =>
      apps.map(app =>
        app.id === id ? { ...app, blocked: !app.blocked } : app
      )
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-secondary">Apps to Block</h2>
      </div>
      <div className="space-y-4">
        {blockedApps.map(app => (
          <div key={app.id} className="flex items-center space-x-3">
            <Checkbox
              id={`app-${app.id}`}
              checked={app.blocked}
              onCheckedChange={() => toggleApp(app.id)}
            />
            <label
              htmlFor={`app-${app.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {app.name}
            </label>
            {app.blocked && isDriving && (
              <span className="ml-auto text-xs text-destructive">Blocked</span>
            )}
          </div>
        ))}
      </div>
      {isDriving && (
        <p className="mt-4 text-sm text-destructive">
          Driving detected - selected apps are blocked
        </p>
      )}
    </div>
  );
};

export default AppBlockList;