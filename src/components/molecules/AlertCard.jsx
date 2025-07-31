import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { format } from "date-fns";

const AlertCard = ({ alert, onDismiss, className }) => {
  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        bgColor: "bg-red-50 border-red-200",
        iconColor: "text-red-600",
        badgeVariant: "error",
        icon: "AlertTriangle"
      },
      warning: {
        bgColor: "bg-amber-50 border-amber-200",
        iconColor: "text-amber-600",
        badgeVariant: "warning",
        icon: "AlertCircle"
      },
      info: {
        bgColor: "bg-blue-50 border-blue-200",
        iconColor: "text-blue-600",
        badgeVariant: "info",
        icon: "Info"
      }
    };
    return configs[severity] || configs.info;
  };

  const config = getSeverityConfig(alert.severity);

  const getAlertMessage = () => {
    switch (alert.type) {
      case "occupancy":
        return `Occupancy rate is ${alert.currentValue.toFixed(1)}%, below the ${alert.threshold}% threshold`;
      case "revenue":
        return `Revenue target missed by ${((alert.threshold - alert.currentValue) / 1000).toFixed(1)}K`;
      case "maintenance":
        return `Maintenance overdue for ${alert.metric}`;
      default:
        return `${alert.metric}: ${alert.currentValue} (threshold: ${alert.threshold})`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn("alert-card", config.bgColor, className)}
    >
      <div className="flex items-start gap-3">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center bg-white/80", config.iconColor)}>
          <ApperIcon name={config.icon} className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={config.badgeVariant} className="text-xs">
              {alert.severity.toUpperCase()}
            </Badge>
            <span className="text-xs text-surface-500">
              {format(new Date(alert.timestamp), "MMM d, HH:mm")}
            </span>
          </div>

          <p className="text-sm font-medium text-surface-900 mb-1">
            {alert.metric}
          </p>
          
          <p className="text-sm text-surface-600">
            {getAlertMessage()}
          </p>
        </div>

        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(alert.id)}
            icon="X"
            className="text-surface-400 hover:text-surface-600 p-1"
          />
        )}
      </div>
    </motion.div>
  );
};

export default AlertCard;