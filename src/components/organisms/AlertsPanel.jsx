import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import AlertCard from "@/components/molecules/AlertCard";
import Empty from "@/components/ui/Empty";
import { cn } from "@/utils/cn";

const AlertsPanel = ({ alerts, onDismissAlert, className }) => {
  const [filter, setFilter] = useState("all");
  
  const filterButtons = [
    { value: "all", label: "All", count: alerts?.length || 0 },
    { value: "critical", label: "Critical", count: alerts?.filter(a => a.severity === "critical").length || 0 },
    { value: "warning", label: "Warning", count: alerts?.filter(a => a.severity === "warning").length || 0 },
  ];

  const filteredAlerts = alerts?.filter(alert => 
    filter === "all" || alert.severity === filter
  ) || [];

  return (
    <div className={cn("bg-white rounded-xl border border-surface-200 shadow-sm", className)}>
      <div className="px-6 py-4 border-b border-surface-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display font-semibold text-surface-900 flex items-center gap-2">
            <ApperIcon name="AlertTriangle" className="w-5 h-5 text-amber-500" />
            Real-time Alerts
          </h3>
          
          <div className="flex gap-1">
            {filterButtons.map((button) => (
              <button
                key={button.value}
                onClick={() => setFilter(button.value)}
                className={cn(
                  "px-3 py-1 text-sm rounded-full transition-colors",
                  filter === button.value
                    ? "bg-primary-100 text-primary-700 font-medium"
                    : "text-surface-600 hover:text-surface-900 hover:bg-surface-100"
                )}
              >
                {button.label}
                {button.count > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-current text-white rounded-full text-xs opacity-80">
                    {button.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {filteredAlerts.length > 0 ? (
            <motion.div
              key="alerts-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 max-h-96 overflow-y-auto"
            >
              {filteredAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onDismiss={onDismissAlert}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-alerts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Empty
                title="No alerts"
                description={
                  filter === "all" 
                    ? "All systems are running smoothly. No alerts to display."
                    : `No ${filter} alerts at the moment.`
                }
                icon="CheckCircle"
                className="py-8"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {filteredAlerts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-surface-200">
            <Button
              variant="outline"
              size="sm"
              icon="Settings"
              className="w-full"
            >
              Manage Alert Settings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;