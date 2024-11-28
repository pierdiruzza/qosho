import SpeedDisplay from "@/components/SpeedDisplay";
import AppBlockList from "@/components/AppBlockList";
import QoshoToggle from "@/components/QoshoToggle";
import Navigation from "@/components/Navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";

const Index = () => {
  const { session } = useSessionContext();
  const userName = session?.user?.user_metadata?.full_name?.split(" ")[0] || "User";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Hi, {userName} 👋</h1>
            <p className="text-sm text-gray-500">Let's make the road a safer place!</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xl">😊</span>
          </div>
        </div>
        <QoshoToggle />
        <SpeedDisplay />
        <AppBlockList editable={false} />
      </div>
      <Navigation />
    </div>
  );
};

export default Index;