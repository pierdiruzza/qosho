import { Checkbox } from "@/components/ui/checkbox";

interface AppItemProps {
  id: number;
  name: string;
  blocked: boolean;
  editable?: boolean;
  onToggle?: (id: number) => void;
}

const AppItem = ({ id, name, blocked, editable = false, onToggle }: AppItemProps) => {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      {editable ? (
        <>
          <Checkbox
            id={`app-${id}`}
            checked={blocked}
            onCheckedChange={() => onToggle?.(id)}
          />
          <label
            htmlFor={`app-${id}`}
            className="text-sm font-medium leading-none cursor-pointer flex-1"
          >
            {name}
          </label>
        </>
      ) : (
        <div className="text-sm font-medium leading-none flex-1">
          {name}
        </div>
      )}
    </div>
  );
};

export default AppItem;