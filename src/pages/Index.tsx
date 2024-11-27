import Navigation from "@/components/Navigation";
import SpeedDisplay from "@/components/SpeedDisplay";
import QoshoToggle from "@/components/QoshoToggle";
import AppBlockList from "@/components/AppBlockList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Safe Driving</h1>
            <p className="text-gray-500 text-sm">Keep focused on the road</p>
          </div>
          <button className="text-2xl p-2 rounded-full hover:bg-gray-100">🚗</button>
        </div>

        <SpeedDisplay />
        <QoshoToggle />
        <AppBlockList />
      </div>
      <Navigation />
    </div>
  );
};

export default Index;