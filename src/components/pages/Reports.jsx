import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ReportBuilder from "@/components/organisms/ReportBuilder";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useReports } from "@/hooks/useReports";
import { cn } from "@/utils/cn";

const Reports = () => {
  const { reports, isLoading, isGenerating, error, generateReport, deleteReport, refetch } = useReports();
  const [view, setView] = useState("generate"); // "generate" or "history"

  const getStatusConfig = (status) => {
    const configs = {
      completed: { variant: "success", icon: "CheckCircle", label: "Completed" },
      generating: { variant: "warning", icon: "Clock", label: "Generating..." },
      error: { variant: "error", icon: "AlertCircle", label: "Error" }
    };
    return configs[status] || configs.completed;
  };

  const getReportTypeIcon = (type) => {
    const icons = {
      occupancy: "Users",
      revenue: "DollarSign",
      "guest-satisfaction": "Heart",
      "staff-performance": "Award"
    };
    return icons[type] || "FileText";
  };

  if (isLoading) {
    return <Loading variant="skeleton" />;
  }

  if (error) {
    return <Error message={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-surface-900">Reports Center</h1>
          <p className="text-surface-600 mt-2">Generate and manage your hotel analytics reports</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === "generate" ? "primary" : "outline"}
            onClick={() => setView("generate")}
            icon="Plus"
          >
            Generate Report
          </Button>
          <Button
            variant={view === "history" ? "primary" : "outline"}
            onClick={() => setView("history")}
            icon="History"
          >
            Report History
          </Button>
        </div>
      </div>

      {view === "generate" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ReportBuilder
            onGenerateReport={generateReport}
            isGenerating={isGenerating}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold text-surface-900">
              Generated Reports ({reports.length})
            </h2>
          </div>

          {reports.length === 0 ? (
            <Empty
              title="No reports generated yet"
              description="Start generating reports to see them listed here. Reports help you analyze hotel performance over different time periods."
              icon="FileText"
              action={{
                label: "Generate First Report",
                onClick: () => setView("generate"),
                icon: "Plus"
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {reports.map((report, index) => {
                const statusConfig = getStatusConfig(report.status);
                return (
                  <motion.div
                    key={report.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="outline" className="hover:border-primary-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <ApperIcon
                              name={getReportTypeIcon(report.type)}
                              className="w-6 h-6 text-primary-600"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-display font-semibold text-surface-900">
                                {report.title}
                              </h3>
                              <Badge variant={statusConfig.variant}>
                                <ApperIcon name={statusConfig.icon} className="w-3 h-3 mr-1" />
                                {statusConfig.label}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-surface-600">
                              <div className="flex items-center gap-1">
                                <ApperIcon name="Calendar" className="w-4 h-4" />
                                {format(new Date(report.dateRange.start), "MMM d")} - {format(new Date(report.dateRange.end), "MMM d, yyyy")}
                              </div>
                              <div className="flex items-center gap-1">
                                <ApperIcon name="Clock" className="w-4 h-4" />
                                Generated {format(new Date(report.generatedAt), "MMM d, yyyy 'at' h:mm a")}
                              </div>
                              <div className="flex items-center gap-1">
                                <ApperIcon name="FileType" className="w-4 h-4" />
                                {report.format.toUpperCase()}
                              </div>
                            </div>

                            {report.data && (
                              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                                {Object.entries(report.data).slice(0, 3).map(([key, value]) => (
                                  <div key={key} className="flex items-center gap-1 text-surface-600">
                                    <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                                    <span>{typeof value === 'number' ? value.toLocaleString() : value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {report.status === "completed" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                icon="Download"
                              >
                                Download
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                icon="Eye"
                              >
                                Preview
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            icon="Trash2"
                            onClick={() => deleteReport(report.Id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Reports;