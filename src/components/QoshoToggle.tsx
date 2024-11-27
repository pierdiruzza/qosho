import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const QoshoToggle = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    toast.info(checked ? "QOSHO protection enabled" : "QOSHO protection disabled");
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 rounded-full p-2">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-gray-900">Active Protection</h2>
          <p className="text-sm text-gray-500">
            {isEnabled 
              ? "Selected apps will be blocked while driving" 
              : "No apps will be blocked"}
          </p>
        </div>
      </div>
      <Switch checked={isEnabled} onCheckedChange={handleToggle} />
    </div>
  );
};

export default QoshoToggle;