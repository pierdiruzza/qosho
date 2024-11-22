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
        <h2 className="text-xl font-semibold text-secondary">QOSHO Protection</h2>
        <p className="text-sm text-muted-foreground">
          {isEnabled ? "Active - Apps will be blocked while driving" : "Inactive - No apps will be blocked"}
        </p>
      </div>
      <Switch checked={isEnabled} onCheckedChange={handleToggle} />
    </div>
  );
};

export default QoshoToggle;