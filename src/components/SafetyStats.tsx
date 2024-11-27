import { Timer, Phone, Gauge, Brain, Info, ChartLine } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SafetyStats = () => {
  const stats = {
    drivingTime: 45,
    phoneUsagePercent: 15,
    averageSpeed: 35,
    focusScore: 2,
  };

  const weekData = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 60 },
    { day: 'Thu', minutes: 40 },
    { day: 'Fri', minutes: 55 },
    { day: 'Sat', minutes: 25 },
    { day: 'Sun', minutes: 35 },
  ];

  const getFocusScoreColor = (score: number) => {
    if (score <= 2) return 'text-success';
    if (score <= 4) return 'text-warning';
    return 'text-destructive';
  };

  const getFocusScoreText = (score: number) => {
    if (score <= 2) return 'Focused 😊';
    if (score <= 4) return 'Somewhat Distracted 😐';
    return 'Very Distracted 😫';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">All Habits</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <Info className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50/80 rounded-2xl p-4 transition-all duration-200 hover:bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <Timer className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-600">Driving Time</span>
            </div>
            <p className="text-2xl font-bold text-black">{stats.drivingTime}m</p>
          </div>

          <div className="bg-gray-50/80 rounded-2xl p-4 transition-all duration-200 hover:bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5 text-warning" />
              <span className="text-sm text-gray-600">Phone Usage</span>
            </div>
            <p className="text-2xl font-bold text-black">{stats.phoneUsagePercent}%</p>
          </div>

          <div className="bg-gray-50/80 rounded-2xl p-4 transition-all duration-200 hover:bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <Gauge className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-600">Average Speed</span>
            </div>
            <p className="text-2xl font-bold text-black">{stats.averageSpeed} km/h</p>
          </div>

          <div className="bg-gray-50/80 rounded-2xl p-4 transition-all duration-200 hover:bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <Brain className={`w-5 h-5 ${getFocusScoreColor(stats.focusScore)}`} />
              <span className="text-sm text-gray-600">Focus Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getFocusScoreColor(stats.focusScore)}`}>
                {stats.focusScore}/5
              </span>
              <span className="text-xs text-gray-500">
                {getFocusScoreText(stats.focusScore)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ChartLine className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-black">Habits</h3>
          </div>
          <span className="text-sm text-gray-500">Compared to last week</span>
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
              <Tooltip />
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
  );
};

export default SafetyStats;