import { useState } from 'react';
import { Shield } from 'lucide-react';

const AppBlockList = () => {
  const [blockedApps, setBlockedApps] = useState([
    { id: 1, name: 'Social Media', blocked: true },
    { id: 2, name: 'Games', blocked: true },
    { id: 3, name: 'Video Apps', blocked: true },
    { id: 4, name: 'Messaging', blocked: false },
  ]);

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
        <h2 className="text-xl font-semibold text-secondary">Blocked Apps</h2>
      </div>
      <div className="space-y-3">
        {blockedApps.map(app => (
          <div key={app.id} className="flex items-center justify-between">
            <span className="text-gray-600">{app.name}</span>
            <button
              onClick={() => toggleApp(app.id)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                app.blocked
                  ? 'bg-success text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {app.blocked ? 'Blocked' : 'Allowed'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppBlockList;