import AppBlockList from "@/components/AppBlockList";
import Navigation from "@/components/Navigation";

const Apps = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FE] p-4 sm:p-6 pb-24">
      <div className="max-w-md mx-auto">
        <AppBlockList editable={true} />
      </div>
      <Navigation />
    </div>
  );
};

export default Apps;