import { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { App } from "@/types/app";
import AppCategory from './AppCategory';

interface AppBlockListProps {
  editable?: boolean;
}

const AppBlockList = ({ editable = false }: AppBlockListProps) => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const [blockedApps, setBlockedApps] = useState<App[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      loadApps();
    }
  }, [session?.user?.id]);

  const loadApps = async () => {
    try {
      const { data: apps, error: appsError } = await supabase
        .from('apps')
        .select('*');

      if (appsError) throw appsError;

      const { data: blockedAppsData, error: blockedError } = await supabase
        .from('blocked_apps')
        .select('app_id')
        .eq('user_id', session?.user?.id);

      if (blockedError) throw blockedError;

      const blockedAppIds = blockedAppsData?.map(row => row.app_id) || [];
      
      const appsWithBlockedStatus = apps?.map(app => ({
        ...app,
        blocked: blockedAppIds.includes(app.id)
      })) || [];

      setBlockedApps(appsWithBlockedStatus);
    } catch (error) {
      console.error('Error loading apps:', error);
      toast.error('Failed to load apps');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleApp = async (id: number) => {
    if (!editable || !session?.user?.id) return;
    
    try {
      const app = blockedApps.find(a => a.id === id);
      if (!app) return;

      if (app.blocked) {
        await supabase
          .from('blocked_apps')
          .delete()
          .eq('user_id', session.user.id)
          .eq('app_id', id);
      } else {
        await supabase
          .from('blocked_apps')
          .insert({ user_id: session.user.id, app_id: id });
      }

      setBlockedApps(apps =>
        apps.map(app =>
          app.id === id ? { ...app, blocked: !app.blocked } : app
        )
      );
    } catch (error) {
      console.error('Error toggling app:', error);
      toast.error('Failed to update app status');
    }
  };

  const groupedApps = Object.entries(
    blockedApps.reduce((acc, app) => {
      if (!acc[app.category]) {
        acc[app.category] = [];
      }
      acc[app.category].push(app);
      return acc;
    }, {} as Record<string, App[]>)
  );

  if (isLoading) {
    return <div className="animate-pulse">Loading apps...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Blocked Apps</h1>
        <p className="text-gray-500">Choose the app you want to block while you drive</p>
      </div>
      
      <div className="space-y-6">
        {groupedApps.map(([category, apps]) => (
          <AppCategory
            key={category}
            category={category}
            apps={apps}
            editable={editable}
            onToggle={toggleApp}
          />
        ))}
      </div>
    </div>
  );
};

export default AppBlockList;