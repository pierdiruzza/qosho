import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

interface QoshoToggleProps {
  onToggleChange?: (enabled: boolean) => void;
}

const QoshoToggle = ({ onToggleChange }: QoshoToggleProps) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    onToggleChange?.(checked);
    toast.info(checked ? "QOSHO protection enabled" : "QOSHO protection disabled");
  };

  return (
    <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
      <p className="text-gray-500 flex-1 pr-4">
        {isEnabled 
          ? "If the Toggle is on, Qosho will automatically block your app while you drive."
          : "Qosho is not active. Turn the toggle on to let Qosho block automatically your app while you drive."
        }
      </p>
      <Switch 
        checked={isEnabled} 
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-green-500"
      />
    </div>
  );
};

export default QoshoToggle;