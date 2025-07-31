import { useState } from "react";
import { motion } from "framer-motion";
import DashboardKPIs from "@/components/organisms/DashboardKPIs";
import ChartsGrid from "@/components/organisms/ChartsGrid";
import AlertsPanel from "@/components/organisms/AlertsPanel";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useMetrics } from "@/hooks/useMetrics";
import { useAlerts } from "@/hooks/useAlerts";
import { subDays } from "date-fns";

const Dashboard = ({ dateRange }) => {
  const { dashboardMetrics, chartData, isLoading: metricsLoading, error: metricsError, refetch } = useMetrics(dateRange);
  const { alerts, dismissAlert } = useAlerts();

  if (metricsLoading) {
    return <Loading variant="skeleton" />;
  }

  if (metricsError) {
    return <Error message={metricsError} onRetry={refetch} />;
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardKPIs metrics={dashboardMetrics} isLoading={metricsLoading} />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <motion.div
          className="xl:col-span-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ChartsGrid data={chartData} isLoading={metricsLoading} />
        </motion.div>

        <motion.div
          className="xl:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AlertsPanel
            alerts={alerts}
            onDismissAlert={dismissAlert}
            className="sticky top-6"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;