import { Timer, Phone, Gauge, Brain, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SafetyStats = () => {
  // This would typically come from a backend/state management
  // For now using mock data
  const stats = {
    drivingTime: 45, // minutes
    phoneUsagePercent: 15, // percentage
    averageSpeed: 35, // km/h
    focusScore: 2, // 1-5 scale
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
    <TooltipProvider>
      <div className="bg-white rounded-xl p-6 shadow-lg mt-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-secondary">Today's Driving Stats</h2>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Timer className="w-6 h-6 text-primary" />
              <UITooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total time spent driving today</p>
                </TooltipContent>
              </UITooltip>
            </div>
            <div className="text-2xl font-bold text-secondary">{stats.drivingTime}m</div>
            <div className="text-sm text-gray-500">Driving Time</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Phone className="w-6 h-6 text-warning" />
              <UITooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Percentage of driving time where phone usage was detected</p>
                </TooltipContent>
              </UITooltip>
            </div>
            <div className="text-2xl font-bold text-secondary">{stats.phoneUsagePercent}%</div>
            <div className="text-sm text-gray-500">Phone Usage</div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Gauge className="w-6 h-6 text-primary" />
              <UITooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Average speed during today's driving sessions</p>
                </TooltipContent>
              </UITooltip>
            </div>
            <div className="text-2xl font-bold text-secondary">{stats.averageSpeed}</div>
            <div className="text-sm text-gray-500">Avg Speed (km/h)</div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Brain className={`w-6 h-6 ${getFocusScoreColor(stats.focusScore)}`} />
              <UITooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Score from 1-5 indicating your focus level while driving (1 = most focused)</p>
                </TooltipContent>
              </UITooltip>
            </div>
            <div className={`text-2xl font-bold ${getFocusScoreColor(stats.focusScore)}`}>
              {stats.focusScore}/5
            </div>
            <div className="text-sm text-gray-500">{getFocusScoreText(stats.focusScore)}</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Weekly Driving Time (minutes)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SafetyStats;