import { Timer, Phone, Gauge, Brain, ChartLine } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SafetyStats = () => {
  const stats = {
    drivingTime: 45,
    phoneUsagePercent: 15,
    averageSpeed: 45,
    focusScore: 2,
    pointsEarned: 322,
    bestStreak: 22
  };

  const weekData = [
    { day: '4', minutes: 30 },
    { day: '5', minutes: 25 },
    { day: '6', minutes: 45 },
    { day: '7', minutes: 35 },
    { day: '8', minutes: 55 },
    { day: '9', minutes: 40 },
    { day: '10', minutes: 50 },
    { day: '11', minutes: 60 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Timer className="w-4 h-4 text-gray-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">Your driving stats</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Driving time today</p>
              <p className="text-2xl font-semibold text-green-500">{stats.drivingTime} minutes</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Phone usage</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.phoneUsagePercent}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Average speed</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.averageSpeed} km/h</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Focus score</p>
              <p className="text-2xl font-semibold text-red-500">{stats.focusScore}/5</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Points earned</p>
              <p className="text-2xl font-semibold text-gray-900">🏆 {stats.pointsEarned}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase">Best streak day</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.bestStreak}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartLine className="w-5 h-5 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-900">Your weekly stats</h3>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">🔥 Burn!</span>
              <span className="text-xs text-orange-500">32 habits</span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="minutes" 
                  stroke="#4B56F0"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "#4B56F0" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyStats;