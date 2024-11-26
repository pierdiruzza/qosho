import { useState, useEffect } from 'react';
import { Shield, Trash2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useSessionContext } from '@supabase/auth-helpers-react';

interface App {
  id: number;
  name: string;
  blocked: boolean;
  category: string;
  logo: string;
}

interface AppBlockListProps {
  editable?: boolean;
}

const AppBlockList = ({ editable = false }: AppBlockListProps) => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const [blockedApps, setBlockedApps] = useState<App[]>([
    { id: 1, name: 'Instagram', blocked: false, category: 'Social Media', logo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=64&h=64&fit=crop' },
    { id: 2, name: 'TikTok', blocked: false, category: 'Social Media', logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=64&h=64&fit=crop' },
    { id: 3, name: 'Facebook', blocked: false, category: 'Social Media', logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=64&h=64&fit=crop' },
    { id: 4, name: 'Twitter', blocked: false, category: 'Social Media', logo: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=64&h=64&fit=crop' },
    { id: 5, name: 'LinkedIn', blocked: false, category: 'Social Media', logo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=64&h=64&fit=crop' },
    { id: 6, name: 'WhatsApp', blocked: false, category: 'Messaging', logo: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=64&h=64&fit=crop' },
    { id: 7, name: 'Telegram', blocked: false, category: 'Messaging', logo: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=64&h=64&fit=crop' },
    { id: 8, name: 'Gmail', blocked: false, category: 'Work', logo: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=64&h=64&fit=crop' },
    { id: 9, name: 'Outlook', blocked: false, category: 'Work', logo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=64&h=64&fit=crop' },
    { id: 10, name: 'Slack', blocked: false, category: 'Work', logo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=64&h=64&fit=crop' },
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

      if (error) {
        console.error('Error loading blocked apps:', error);
        toast.error('Failed to load blocked apps');
        return;
      }

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
      console.error('Error in loadBlockedApps:', error);
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

      if (error) {
        console.error('Error clearing blocked apps:', error);
        toast.error('Failed to clear blocked apps');
        return;
      }

      setBlockedApps(apps => apps.map(app => ({ ...app, blocked: false })));
      toast.success('All apps unblocked successfully!');
    } catch (error) {
      console.error('Error in handleClearAll:', error);
      toast.error('An error occurred while clearing apps');
    }
  };

  const handleSave = async () => {
    if (!editable || !session?.user?.id) return;

    try {
      const { error: deleteError } = await supabase
        .from('blocked_apps')
        .delete()
        .eq('user_id', session.user.id);

      if (deleteError) {
        console.error('Error deleting blocked apps:', deleteError);
        toast.error('Failed to update blocked apps');
        return;
      }

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

        if (insertError) {
          console.error('Error inserting blocked apps:', insertError);
          toast.error('Failed to save blocked apps');
          return;
        }
      }

      await loadBlockedApps();
      toast.success('Apps blocked successfully!');
    } catch (error) {
      console.error('Error in handleSave:', error);
      toast.error('An error occurred while saving');
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-6 animate-fade-in" style={{ fontFamily: 'Airbnb Cereal, sans-serif' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-secondary">
            {editable ? "Select Apps to Block" : "Blocked Apps"}
          </h2>
        </div>
        <div className="flex gap-2">
          {editable && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-sm flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          )}
          {!editable && (
            <Button
              variant="outline"
              onClick={() => navigate('/apps')}
              className="text-sm"
            >
              Manage apps
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-6">
        {Object.entries(
          blockedApps
            .filter(app => editable || app.blocked)
            .reduce((acc, app) => {
              if (!acc[app.category]) {
                acc[app.category] = [];
              }
              acc[app.category].push(app);
              return acc;
            }, {} as Record<string, App[]>)
        ).map(([category, apps]) => (
          <div key={category} className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">{category}</h3>
            <div className="space-y-3">
              {apps.map(app => (
                <div key={app.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={app.logo}
                    alt={`${app.name} logo`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {editable ? (
                    <>
                      <Checkbox
                        id={`app-${app.id}`}
                        checked={app.blocked}
                        onCheckedChange={() => toggleApp(app.id)}
                      />
                      <label
                        htmlFor={`app-${app.id}`}
                        className="text-sm font-medium leading-none cursor-pointer flex-1"
                      >
                        {app.name}
                      </label>
                    </>
                  ) : (
                    <div className="text-sm font-medium leading-none flex-1">
                      {app.name}
                    </div>
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
    </div>
  );
};

export default AppBlockList;