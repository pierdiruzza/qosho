import { App } from "@/types/app";
import AppItem from "./AppItem";

interface AppCategoryProps {
  category: string;
  apps: App[];
  editable?: boolean;
  onToggle?: (id: number) => void;
}

const AppCategory = ({ category, apps, editable = false, onToggle }: AppCategoryProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
        {editable && (
          <button className="text-primary font-medium">
            EDIT
          </button>
        )}
      </div>
      <div className="space-y-2 bg-white rounded-2xl p-2">
        {apps.map(app => (
          <AppItem
            key={app.id}
            id={app.id}
            name={app.name}
            blocked={app.blocked}
            editable={editable}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default AppCategory;