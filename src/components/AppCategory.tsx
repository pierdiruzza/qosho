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
    <div className="space-y-2">
      <h3 className="font-medium text-sm text-muted-foreground">{category}</h3>
      <div className="space-y-1 bg-white rounded-lg border border-gray-100">
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