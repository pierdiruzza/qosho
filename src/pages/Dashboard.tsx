import Navigation from "@/components/Navigation";
import SafetyStats from "@/components/SafetyStats";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Activity</h1>
          <div className="flex gap-2">
            <button className="px-4 py-1 rounded-full bg-primary text-white text-sm">Daily</button>
            <button className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">Weekly</button>
            <button className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">Monthly</button>
          </div>
        </div>
        <SafetyStats />
      </div>
      <Navigation />
    </div>
  );
};

export default Dashboard;