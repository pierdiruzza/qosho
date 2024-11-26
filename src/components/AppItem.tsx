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
    <div className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
      {editable ? (
        <>
          <Checkbox
            id={`app-${id}`}
            checked={blocked}
            onCheckedChange={() => onToggle?.(id)}
            className="h-5 w-5 rounded-md border-gray-200"
          />
          <label
            htmlFor={`app-${id}`}
            className="ml-3 text-sm font-medium text-gray-700 cursor-pointer flex-1"
          >
            {name}
          </label>
        </>
      ) : (
        <div className="text-sm font-medium text-gray-700 flex-1 pl-2">
          {name}
        </div>
      )}
    </div>
  );
};

export default AppItem;