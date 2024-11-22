import SpeedDisplay from "@/components/SpeedDisplay";
import AppBlockList from "@/components/AppBlockList";
import SafetyStats from "@/components/SafetyStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-secondary mb-6">SafeDrive</h1>
        <SpeedDisplay />
        <AppBlockList />
        <SafetyStats />
      </div>
    </div>
  );
};

export default Index;