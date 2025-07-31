import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AlertCard from "@/components/molecules/AlertCard";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useAlerts } from "@/hooks/useAlerts";
import { cn } from "@/utils/cn";

const Alerts = () => {
  const { alerts, isLoading, error, dismissAlert, refetch } = useAlerts();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filterOptions = [
    { value: "all", label: "All Alerts", count: alerts.length },
    { value: "critical", label: "Critical", count: alerts.filter(a => a.severity === "critical").length },
    { value: "warning", label: "Warning", count: alerts.filter(a => a.severity === "warning").length },
    { value: "info", label: "Info", count: alerts.filter(a => a.severity === "info").length },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "severity", label: "By Severity" },
  ];

  const getFilteredAndSortedAlerts = () => {
    let filtered = alerts;
    
    if (filter !== "all") {
      filtered = alerts.filter(alert => alert.severity === filter);
    }

    switch (sortBy) {
      case "oldest":
        return filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      case "severity":
        const severityOrder = { critical: 3, warning: 2, info: 1 };
        return filtered.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
      default: // newest
        return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
  };

  const filteredAlerts = getFilteredAndSortedAlerts();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-surface-900">Alert Management</h1>
          <p className="text-surface-600 mt-2">Monitor and manage real-time hotel alerts</p>
        </div>

        <Button variant="outline" onClick={refetch} icon="RefreshCw">
          Refresh
        </Button>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filterOptions.map((option) => (
          <Card
            key={option.value}
            variant="outline"
            className={cn(
              "cursor-pointer transition-all duration-300",
              filter === option.value && "border-primary-500 bg-primary-50/50"
            )}
            onClick={() => setFilter(option.value)}
          >
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-surface-900 mb-1">
                {option.count}
              </div>
              <div className="text-sm font-medium text-surface-600">
                {option.label}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Controls */}
      <Card variant="outline">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={cn(
                  "px-4 py-2 text-sm rounded-lg font-medium transition-colors",
                  filter === option.value
                    ? "bg-primary-500 text-white"
                    : "bg-surface-100 text-surface-700 hover:bg-surface-200"
                )}
              >
                {option.label}
                {option.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-current text-white/90 rounded-full text-xs">
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-surface-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-surface-300 rounded-lg text-sm focus:border-primary-500 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <AnimatePresence mode="wait">
        {filteredAlerts.length === 0 ? (
          <motion.div
            key="no-alerts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Empty
              title={filter === "all" ? "No alerts" : `No ${filter} alerts`}
              description={
                filter === "all"
                  ? "Your hotel is running smoothly with no active alerts."
                  : `No ${filter} alerts are currently active.`
              }
              icon="CheckCircle"
            />
          </motion.div>
        ) : (
          <motion.div
            key="alerts-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AlertCard
                  alert={alert}
                  onDismiss={dismissAlert}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert Settings */}
      <Card variant="outline">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-display font-semibold text-surface-900 mb-1">
              Alert Configuration
            </h3>
            <p className="text-sm text-surface-600">
              Manage alert thresholds and notification preferences
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" icon="Settings">
              Configure Thresholds
            </Button>
            <Button variant="outline" icon="Bell">
              Notification Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Alerts;