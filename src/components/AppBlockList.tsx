import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { App } from "@/types/app";
import AppHeader from './AppHeader';
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
      // Load all apps
      const { data: apps, error: appsError } = await supabase
        .from('apps')
        .select('*');

      if (appsError) throw appsError;

      // Load user's blocked apps
      const { data: blockedAppsData, error: blockedError } = await supabase
        .from('blocked_apps')
        .select('app_id')
        .eq('user_id', session?.user?.id);

      if (blockedError) throw blockedError;

      const blockedAppIds = blockedAppsData?.map(row => row.app_id) || [];
      
      // Combine the data
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

  if (!editable) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">App Group</h3>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
              Blocked
            </span>
            <Button
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => navigate('/apps')}
            >
              EDIT
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const toggleApp = (id: number) => {
    if (!editable) return;
    setBlockedApps(apps =>
      apps.map(app =>
        app.id === id ? { ...app, blocked: !app.blocked } : app
      )
    );
  };

  const handleClearAll = async () => {
    if (!editable || !session?.user?.id) return;
    try {
      const { error } = await supabase
        .from('blocked_apps')
        .delete()
        .eq('user_id', session.user.id);

      if (error) throw error;

      setBlockedApps(apps => apps.map(app => ({ ...app, blocked: false })));
      toast.success('All apps unblocked successfully!');
    } catch (error) {
      console.error('Error clearing blocked apps:', error);
      toast.error('Failed to clear blocked apps');
    }
  };

  const handleSave = async () => {
    if (!editable || !session?.user?.id) return;

    try {
      const { error: deleteError } = await supabase
        .from('blocked_apps')
        .delete()
        .eq('user_id', session.user.id);

      if (deleteError) throw deleteError;

      const appsToBlock = blockedApps.filter(app => app.blocked);
      if (appsToBlock.length > 0) {
        const { error: insertError } = await supabase
          .from('blocked_apps')
          .insert(
            appsToBlock.map(app => ({
              user_id: session.user.id,
              app_id: app.id
            }))
          );

        if (insertError) throw insertError;
      }

      toast.success('Apps blocked successfully!');
      await loadApps();
    } catch (error) {
      console.error('Error saving blocked apps:', error);
      toast.error('Failed to save blocked apps');
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
      <AppHeader editable={editable} onClearAll={handleClearAll} />
      
      <div className="space-y-4">
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
      
      {editable && (
        <div className="mt-6">
          <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90">
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppBlockList;