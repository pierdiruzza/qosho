import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface App {
  id: number;
  name: string;
  blocked: boolean;
  category: string;
}

const AppBlockList = () => {
  const [blockedApps, setBlockedApps] = useState<App[]>([
    { id: 1, name: 'Instagram', blocked: false, category: 'Social Media' },
    { id: 2, name: 'TikTok', blocked: false, category: 'Social Media' },
    { id: 3, name: 'Facebook', blocked: false, category: 'Social Media' },
    { id: 4, name: 'Twitter', blocked: false, category: 'Social Media' },
    { id: 5, name: 'LinkedIn', blocked: false, category: 'Social Media' },
    { id: 6, name: 'WhatsApp', blocked: false, category: 'Messaging' },
    { id: 7, name: 'Telegram', blocked: false, category: 'Messaging' },
    { id: 8, name: 'Gmail', blocked: false, category: 'Work' },
    { id: 9, name: 'Outlook', blocked: false, category: 'Work' },
    { id: 10, name: 'Slack', blocked: false, category: 'Work' },
  ]);

  const [isDriving, setIsDriving] = useState(false);

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

  const categories = Array.from(new Set(blockedApps.map(app => app.category)));

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-secondary">Apps to Block</h2>
      </div>
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category} className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">{category}</h3>
            <div className="space-y-2">
              {blockedApps
                .filter(app => app.category === category)
                .map(app => (
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
