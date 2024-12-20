import { Plus, Check } from "lucide-react";

interface AppItemProps {
  id: number;
  name: string;
  blocked: boolean;
  editable?: boolean;
  onToggle?: (id: number) => void;
}

const AppItem = ({ id, name, blocked, editable = false, onToggle }: AppItemProps) => {
  return (
    <div 
      className={`
        flex items-center justify-between p-4 
        rounded-xl bg-white transition-colors
        ${editable ? 'cursor-pointer hover:bg-gray-50' : ''}
      `}
      onClick={() => editable && onToggle?.(id)}
    >
      <div className="space-y-1">
        <h4 className="font-medium text-gray-900">{name}</h4>
        <p className="text-sm text-gray-500">
          {blocked 
            ? "You've already selected this app."
            : 'Click on "+" to select this app'}
        </p>
      </div>
      <div className={`
        w-8 h-8 flex items-center justify-center rounded-full
        transition-all duration-300 ease-in-out
        ${blocked 
          ? 'bg-[#22C55E] text-white scale-110' 
          : 'bg-white border-2 border-gray-200 text-gray-400 hover:border-[#22C55E]/50'}
      `}>
        {blocked ? (
          <Check className="w-5 h-5 animate-fade-in" />
        ) : (
          <Plus className="w-5 h-5 animate-fade-in" />
        )}
      </div>
    </div>
  );
};

export default AppItem;