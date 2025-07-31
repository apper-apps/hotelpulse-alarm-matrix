import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Empty = ({ title, description, action, className, icon = "Database" }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center", className)}>
      <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} className="w-8 h-8 text-surface-400" />
      </div>
      <h3 className="text-lg font-display font-semibold text-surface-900 mb-2">
        {title || "No data available"}
      </h3>
      <p className="text-surface-600 mb-6 max-w-md">
        {description || "There's no analytics data to display at the moment. Start collecting data to see insights here."}
      </p>
      {action && (
        <button onClick={action.onClick} className="btn-primary">
          <ApperIcon name={action.icon || "Plus"} className="w-4 h-4 mr-2" />
          {action.label}
        </button>
      )}
    </div>
  );
};

export default Empty;