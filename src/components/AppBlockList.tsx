import { useState, useEffect } from 'react';
import { Shield, Trash2, Plus, Check } from 'lucide-react';
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
      {editable && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">
              {editable ? "Select Apps to Block" : "Blocked Apps"}
            </h2>
          </div>
          <Button
            variant="outline"
            onClick={handleClearAll}
            className="text-sm flex items-center gap-1 h-9"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        </div>
      )}
      
      <div className="space-y-4">
        {groupedApps.map(([category, apps]) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">{category}</h3>
              {editable && (
                <button className="text-primary text-sm font-medium">
                  EDIT
                </button>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-50">
              {apps.map(app => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  onClick={() => editable && toggleApp(app.id)}
                >
                  <span className="text-sm text-gray-700">{app.name}</span>
                  {editable ? (
                    <button
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        app.blocked
                          ? 'bg-primary text-white'
                          : 'border-2 border-gray-200'
                      }`}
                    >
                      {app.blocked && <Check className="w-4 h-4" />}
                      {!app.blocked && <Plus className="w-4 h-4 text-gray-400" />}
                    </button>
                  ) : app.blocked ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
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