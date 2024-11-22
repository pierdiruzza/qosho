import { Timer, Trophy } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SafetyStats = () => {
  const weekData = [
    { day: 'Mon', hours: 2.1 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 2.3 },
    { day: 'Thu', hours: 1.9 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 1.7 },
    { day: 'Sun', hours: 2.0 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-secondary">Safety Stats</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Timer className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-secondary">2.5h</div>
          <div className="text-sm text-gray-500">Safe Driving Today</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Trophy className="w-6 h-6 text-success mx-auto mb-2" />
          <div className="text-2xl font-bold text-secondary">95%</div>
          <div className="text-sm text-gray-500">Safety Score</div>
        </div>
      </div>
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weekData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SafetyStats;