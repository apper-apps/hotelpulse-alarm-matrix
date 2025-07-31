import { cn } from "@/utils/cn";

const Loading = ({ className, variant = "default" }) => {
  if (variant === "skeleton") {
    return (
      <div className={cn("animate-pulse space-y-6", className)}>
        {/* KPI Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface-200 h-32 rounded-xl"></div>
          ))}
        </div>
        
        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-200 h-80 rounded-xl"></div>
          <div className="bg-surface-200 h-80 rounded-xl"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface-200 h-80 rounded-xl"></div>
          <div className="bg-surface-200 h-80 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-12", className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-surface-200 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-surface-600 font-medium">Loading analytics...</p>
      </div>
    </div>
  );
};

export default Loading;