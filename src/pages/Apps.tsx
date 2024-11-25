import AppBlockList from "@/components/AppBlockList";
import Navigation from "@/components/Navigation";

const Apps = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-secondary mb-6">Blocked Apps</h1>
        <AppBlockList editable={true} />
      </div>
      <Navigation />
    </div>
  );
};

export default Apps;