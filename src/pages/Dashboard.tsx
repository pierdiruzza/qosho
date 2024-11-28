import Navigation from "@/components/Navigation";
import SafetyStats from "@/components/SafetyStats";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const currentWeek = {
    start: new Date(2024, 4, 28),
    end: new Date(2024, 5, 3)
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
        
        <div className="flex flex-col gap-4">
          <div className="bg-gray-100 p-1 rounded-full flex justify-between w-fit">
            {['Daily', 'Weekly', 'Monthly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period.toLowerCase() as any)}
                className={`px-6 py-2 rounded-full text-sm transition-all ${
                  selectedPeriod === period.toLowerCase()
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">This week</p>
              <p className="text-sm text-gray-500">
                May 28 - Jun 3
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <SafetyStats />
      </div>
      <Navigation />
    </div>
  );
};

export default Dashboard;