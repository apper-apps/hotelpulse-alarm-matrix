import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Error = ({ message, onRetry, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center", className)}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-display font-semibold text-surface-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-surface-600 mb-6 max-w-md">
        {message || "We encountered an error while loading your hotel analytics data. Please try again."}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;