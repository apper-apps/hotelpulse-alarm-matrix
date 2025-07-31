import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const ChartContainer = ({ title, children, className, actions }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={cn("chart-container p-6", className, isFullscreen && "fixed inset-4 z-50")}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold text-surface-900">
          {title}
        </h3>
        
        <div className="flex items-center gap-2">
          {actions}
          <Button
            variant="ghost"
            size="sm"
            icon={isFullscreen ? "Minimize2" : "Maximize2"}
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-surface-400 hover:text-surface-600"
          />
        </div>
      </div>

      <div className={cn("relative", isFullscreen ? "h-[calc(100vh-8rem)]" : "h-80")}>
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;