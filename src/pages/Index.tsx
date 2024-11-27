import SpeedDisplay from "@/components/SpeedDisplay";
import AppBlockList from "@/components/AppBlockList";
import QoshoToggle from "@/components/QoshoToggle";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-secondary mb-6">QOSHO</h1>
        <QoshoToggle />
        <SpeedDisplay />
        <AppBlockList editable={false} />
      </div>
      <Navigation />
    </div>
  );
};

export default Index;