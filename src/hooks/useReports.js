import { useState, useEffect } from "react";
import { reportsService } from "@/services/api/reportsService";
import { toast } from "react-toastify";

export const useReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const loadReports = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const data = await reportsService.getAll();
      setReports(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load reports");
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async (reportConfig) => {
    try {
      setIsGenerating(true);
      const newReport = await reportsService.generate(reportConfig);
      setReports(prev => [newReport, ...prev]);
      toast.success("Report generated successfully");
      return newReport;
    } catch (err) {
      toast.error("Failed to generate report");
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteReport = async (reportId) => {
    try {
      await reportsService.delete(reportId);
      setReports(prev => prev.filter(report => report.Id !== parseInt(reportId)));
      toast.success("Report deleted");
    } catch (err) {
      toast.error("Failed to delete report");
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return {
    reports,
    isLoading,
    isGenerating,
    error,
    generateReport,
    deleteReport,
    refetch: loadReports
  };
};