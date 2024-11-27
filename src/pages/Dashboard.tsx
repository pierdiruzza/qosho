import Navigation from "@/components/Navigation";
import SafetyStats from "@/components/SafetyStats";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <SafetyStats />
      </div>
      <Navigation />
    </div>
  );
};

export default Dashboard;