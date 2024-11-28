import AppBlockList from "@/components/AppBlockList";
import Navigation from "@/components/Navigation";

const Apps = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Blocked Apps</h1>
          <p className="text-sm text-gray-500">Choose the app you want to block while you drive</p>
        </div>
        <AppBlockList editable={true} />
      </div>
      <Navigation />
    </div>
  );
};

export default Apps;