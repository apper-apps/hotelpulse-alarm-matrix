import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const KPICard = ({ title, value, previousValue, format = "number", icon, trend, className }) => {
  const formatValue = (val) => {
    if (!val) return "0";
    
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case "percentage":
        return `${val.toFixed(1)}%`;
      case "number":
        return new Intl.NumberFormat("en-US").format(val);
      default:
        return val.toString();
    }
  };

  const calculateChange = () => {
    if (!previousValue || previousValue === 0) return 0;
    return ((value - previousValue) / previousValue) * 100;
  };

  const change = calculateChange();
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <Card className={cn("kpi-gradient relative overflow-hidden", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && (
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <ApperIcon name={icon} className="w-4 h-4 text-primary-600" />
              </div>
            )}
            <p className="text-sm font-medium text-surface-600">{title}</p>
          </div>
          
          <motion.div
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-3"
          >
            <h3 className="text-3xl font-display font-bold text-surface-900">
              {formatValue(value)}
            </h3>
          </motion.div>

          {previousValue !== undefined && (
            <div className="flex items-center gap-1">
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                isPositive && "bg-green-100 text-green-800",
                isNegative && "bg-red-100 text-red-800",
                !isPositive && !isNegative && "bg-surface-100 text-surface-600"
              )}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <ApperIcon 
                    name={isPositive ? "TrendingUp" : isNegative ? "TrendingDown" : "Minus"} 
                    className="w-3 h-3" 
                  />
                </motion.div>
                {Math.abs(change).toFixed(1)}%
              </div>
              <span className="text-xs text-surface-500">vs previous period</span>
            </div>
          )}
        </div>

        {trend && (
          <div className="w-20 h-12">
            <svg className="w-full h-full" viewBox="0 0 80 48">
              <motion.path
                d={`M 0,${48 - (trend[0] / Math.max(...trend)) * 32} ${trend.map((point, i) => 
                  `L ${(i * 80) / (trend.length - 1)},${48 - (point / Math.max(...trend)) * 32}`
                ).join(" ")}`}
                fill="none"
                stroke={isPositive ? "#10b981" : isNegative ? "#ef4444" : "#6b7280"}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-bl-3xl" />
    </Card>
  );
};

export default KPICard;