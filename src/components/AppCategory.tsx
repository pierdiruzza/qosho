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
      <h3 className="text-sm font-medium text-gray-500">{category}</h3>
      <div className="bg-white rounded-xl shadow-card divide-y divide-gray-50">
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