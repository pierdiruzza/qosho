import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
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
}

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
    const { data, error } = await supabase
      .from('blocked_apps')
      .select('app_id');

    if (error) {
      toast.error('Failed to load blocked apps');
      return;
    }

    const blockedAppIds = data.map(row => row.app_id);
    setBlockedApps(apps =>
      apps.map(app => ({
        ...app,
        blocked: blockedAppIds.includes(app.id)
      }))
    );
  };

  const toggleApp = (id: number) => {
    if (!editable) return;
    setBlockedApps(apps =>
      apps.map(app =>
        app.id === id ? { ...app, blocked: !app.blocked } : app
      )
    );
  };

  const handleSave = async () => {
    if (!editable || !session?.user?.id) return;

    // Delete all existing blocked apps
    const { error: deleteError } = await supabase
      .from('blocked_apps')
      .delete()
      .eq('user_id', session.user.id);

    if (deleteError) {
      toast.error('Failed to update blocked apps');
      return;
    }

    // Insert newly blocked apps
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
        toast.error('Failed to save blocked apps');
        return;
      }
    }

    toast.success("App blocking preferences saved!");
  };

  const categories = Array.from(new Set(blockedApps.filter(app => editable || app.blocked).map(app => app.category)));

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-secondary">
            {editable ? "Select Apps to Block" : "Blocked Apps"}
          </h2>
        </div>
        {!editable && (
          <Button
            variant="outline"
            onClick={() => navigate('/apps')}
            className="text-sm"
          >
            Add apps
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category} className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">{category}</h3>
            <div className="space-y-2">
              {blockedApps
                .filter(app => app.category === category && (editable || app.blocked))
                .map(app => (
                  <div key={app.id} className="flex items-center space-x-3">
                    {editable ? (
                      <>
                        <Checkbox
                          id={`app-${app.id}`}
                          checked={app.blocked}
                          onCheckedChange={() => toggleApp(app.id)}
                        />
                        <label
                          htmlFor={`app-${app.id}`}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {app.name}
                        </label>
                      </>
                    ) : (
                      <div className="text-sm font-medium leading-none">
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