import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface App {
  id: number;
  name: string;
  blocked: boolean;
  category: string;
}

interface AppBlockListProps {
  editable?: boolean;
}

const AppBlockList = ({ editable = false }: AppBlockListProps) => {
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
    if (!editable) return;
    setBlockedApps(apps =>
      apps.map(app =>
        app.id === id ? { ...app, blocked: !app.blocked } : app
      )
    );
  };

  const handleSave = () => {
    if (!editable) return;
    // In a real app, this would save to a backend
    toast.success("App blocking preferences saved!");
  };

  const categories = Array.from(new Set(blockedApps.map(app => app.category)));

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-secondary">
          {editable ? "Select Apps to Block" : "Blocked Apps"}
        </h2>
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
                      disabled={!editable}
                    />
                    <label
                      htmlFor={`app-${app.id}`}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        !editable ? 'cursor-default' : 'cursor-pointer'
                      }`}
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
      {editable && (
        <div className="mt-6">
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      )}
      {isDriving && (
        <p className="mt-4 text-sm text-destructive">
          Driving detected - selected apps are blocked
        </p>
      )}
    </div>
  );
};

export default AppBlockList;