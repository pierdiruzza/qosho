import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-secondary">Active Qosho</h2>
        <p className="text-sm text-muted-foreground">
          {isEnabled ? "If the toggle is on, the selected apps will be blocked when your speed is above 20km/h" : "Inactive - No apps will be blocked"}
        </p>
      </div>
      <Switch checked={isEnabled} onCheckedChange={handleToggle} />
    </div>
  );
};

export default QoshoToggle;