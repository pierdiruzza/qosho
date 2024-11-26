import { useState, useEffect } from 'react';
import { Shield, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { App } from "@/types/app";
import AppCategory from "./AppCategory";

interface AppBlockListProps {
  editable?: boolean;
}

const AppBlockList = ({ editable = false }: AppBlockListProps) => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
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

  useEffect(() => {
    if (session?.user?.id) {
      loadBlockedApps();
    }
  }, [session?.user?.id]);

  const loadBlockedApps = async () => {
    try {
      const { data, error } = await supabase
        .from('blocked_apps')
        .select('app_id')
        .eq('user_id', session?.user?.id);

      if (error) throw error;

      if (data) {
        const blockedAppIds = data.map(row => row.app_id);
        setBlockedApps(prevApps =>
          prevApps.map(app => ({
            ...app,
            blocked: blockedAppIds.includes(app.id)
          }))
        );
      }
    } catch (error) {
      console.error('Error loading blocked apps:', error);
      toast.error('Failed to load blocked apps');
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

      await loadBlockedApps();
      toast.success('Apps blocked successfully!');
    } catch (error) {
      console.error('Error saving blocked apps:', error);
      toast.error('Failed to save blocked apps');
    }
  };

  const groupedApps = Object.entries(
    blockedApps
      .filter(app => editable || app.blocked)
      .reduce((acc, app) => {
        if (!acc[app.category]) {
          acc[app.category] = [];
        }
        acc[app.category].push(app);
        return acc;
      }, {} as Record<string, App[]>)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-secondary-foreground">
            {editable ? "Select Apps to Block" : "Blocked Apps"}
          </h2>
        </div>
        <div className="flex gap-2">
          {editable && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-sm flex items-center gap-1 h-9"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          )}
          {!editable && (
            <Button
              variant="outline"
              onClick={() => navigate('/apps')}
              className="text-sm h-9"
            >
              Manage apps
            </Button>
          )}
        </div>
      </div>
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