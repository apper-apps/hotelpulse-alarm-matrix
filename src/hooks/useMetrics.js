import { useState, useEffect } from "react";
import { metricsService } from "@/services/api/metricsService";

export const useMetrics = (dateRange) => {
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardMetrics = async () => {
    try {
      setError(null);
      const metrics = await metricsService.getDashboardMetrics(dateRange);
      setDashboardMetrics(metrics);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadChartData = async () => {
    try {
      setError(null);
      const data = await metricsService.getChartData(dateRange);
      setChartData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([loadDashboardMetrics(), loadChartData()]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [dateRange]);

  return {
    dashboardMetrics,
    chartData,
    isLoading,
    error,
    refetch: loadAllData
  };
};