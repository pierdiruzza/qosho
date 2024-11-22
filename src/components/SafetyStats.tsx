import { Timer, Trophy } from 'lucide-react';

const SafetyStats = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-secondary">Safety Stats</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
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
    </div>
  );
};

export default SafetyStats;