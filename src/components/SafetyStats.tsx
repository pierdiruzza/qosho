import { Timer, Phone, Gauge, Brain, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
    <TooltipProvider>
      <div className="bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-black">Today's Driving Stats</h2>
        </div>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center p-4 bg-gray-50/80 rounded-xl transition-all duration-200 hover:bg-gray-50">
            <Timer className="w-8 h-8 text-primary mr-4" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Driving Time</span>
                <UITooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Total time spent driving today</p>
                  </TooltipContent>
                </UITooltip>
              </div>
              <div className="text-xl font-bold text-black">{stats.drivingTime}m</div>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50/80 rounded-xl transition-all duration-200 hover:bg-gray-50">
            <Phone className="w-8 h-8 text-warning mr-4" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Phone Usage</span>
                <UITooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage of driving time where phone usage was detected</p>
                  </TooltipContent>
                </UITooltip>
              </div>
              <div className="text-xl font-bold text-black">{stats.phoneUsagePercent}%</div>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50/80 rounded-xl transition-all duration-200 hover:bg-gray-50">
            <Gauge className="w-8 h-8 text-primary mr-4" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Average Speed</span>
                <UITooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Average speed during today's driving sessions</p>
                  </TooltipContent>
                </UITooltip>
              </div>
              <div className="text-xl font-bold text-black">{stats.averageSpeed} km/h</div>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50/80 rounded-xl transition-all duration-200 hover:bg-gray-50">
            <Brain className={`w-8 h-8 ${getFocusScoreColor(stats.focusScore)} mr-4`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Focus Score</span>
                <UITooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Score from 1-5 indicating your focus level while driving (1 = most focused)</p>
                  </TooltipContent>
                </UITooltip>
              </div>
              <div className="flex items-center">
                <span className={`text-xl font-bold ${getFocusScoreColor(stats.focusScore)}`}>
                  {stats.focusScore}/5
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {getFocusScoreText(stats.focusScore)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-black mb-4">Weekly Driving Time (minutes)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#4B56F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SafetyStats;