import { Shield, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  editable?: boolean;
  onClearAll: () => void;
}

const AppHeader = ({ editable = false, onClearAll }: AppHeaderProps) => {
  if (!editable) return null;
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">
          Select Apps to Block
        </h2>
      </div>
      <Button
        variant="outline"
        onClick={onClearAll}
        className="text-sm flex items-center gap-1 h-9"
      >
        <Trash2 className="w-4 h-4" />
        Clear All
      </Button>
    </div>
  );
};

export default AppHeader;