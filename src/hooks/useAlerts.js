import { useState, useEffect } from "react";
import { alertsService } from "@/services/api/alertsService";
import { toast } from "react-toastify";

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAlerts = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await alertsService.getAll();
      setAlerts(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load alerts");
    } finally {
      setIsLoading(false);
    }
  };

  const dismissAlert = async (alertId) => {
    try {
      await alertsService.dismiss(alertId);
      setAlerts(prev => prev.filter(alert => alert.Id !== parseInt(alertId)));
      toast.success("Alert dismissed");
    } catch (err) {
      toast.error("Failed to dismiss alert");
    }
  };

  const createAlert = async (alertData) => {
    try {
      const newAlert = await alertsService.create(alertData);
      setAlerts(prev => [newAlert, ...prev]);
      toast.success("Alert created");
      return newAlert;
    } catch (err) {
      toast.error("Failed to create alert");
      throw err;
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return {
    alerts,
    isLoading,
    error,
    dismissAlert,
    createAlert,
    refetch: loadAlerts
  };
};