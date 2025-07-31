import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import DateRangeSelector from "@/components/molecules/DateRangeSelector";
import { cn } from "@/utils/cn";
import { toast } from "react-toastify";

const ReportBuilder = ({ onGenerateReport, isGenerating = false }) => {
  const [selectedReport, setSelectedReport] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [exportFormat, setExportFormat] = useState("pdf");

  const reportTypes = [
    {
      id: "occupancy",
      title: "Occupancy Report",
      description: "Detailed room occupancy analysis with trends and patterns",
      icon: "Users",
      features: ["Daily occupancy rates", "Room type breakdown", "Seasonal patterns", "Forecasting"]
    },
    {
      id: "revenue",
      title: "Revenue Summary",
      description: "Comprehensive revenue analytics across all channels",
      icon: "DollarSign",
      features: ["Revenue by source", "ADR trends", "RevPAR analysis", "Profit margins"]
    },
    {
      id: "guest-satisfaction",
      title: "Guest Satisfaction",
      description: "Guest feedback analysis and satisfaction metrics",
      icon: "Heart",
      features: ["Review scores", "Feedback trends", "Service ratings", "Improvement areas"]
    },
    {
      id: "staff-performance",
      title: "Staff Performance",
      description: "Employee productivity and performance tracking",
      icon: "Award",
      features: ["Task completion", "Guest interactions", "Performance scores", "Training needs"]
    }
  ];

  const handleGenerate = () => {
    if (!selectedReport) {
      toast.error("Please select a report type");
      return;
    }
    
    if (!dateRange) {
      toast.error("Please select a date range");
      return;
    }

    const reportConfig = {
      type: selectedReport,
      dateRange,
      format: exportFormat,
      timestamp: new Date()
    };

    onGenerateReport(reportConfig);
    toast.success(`${reportTypes.find(r => r.id === selectedReport)?.title} generation started`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-surface-900 mb-2">Generate Reports</h2>
        <p className="text-surface-600">Create comprehensive analytics reports for your hotel performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              variant="outline"
              className={cn(
                "cursor-pointer transition-all duration-300 hover:border-primary-300",
                selectedReport === report.id && "border-primary-500 bg-primary-50/50"
              )}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                  selectedReport === report.id 
                    ? "bg-primary-500 text-white" 
                    : "bg-surface-100 text-surface-600"
                )}>
                  <ApperIcon name={report.icon} className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-display font-semibold text-surface-900 mb-1">
                    {report.title}
                  </h3>
                  <p className="text-surface-600 text-sm mb-3">
                    {report.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {report.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-surface-100 text-surface-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  selectedReport === report.id
                    ? "border-primary-500 bg-primary-500"
                    : "border-surface-300"
                )}>
                  {selectedReport === report.id && (
                    <ApperIcon name="Check" className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card variant="outline">
        <h3 className="text-lg font-display font-semibold text-surface-900 mb-4">Report Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Date Range</label>
            <DateRangeSelector
              value={dateRange}
              onChange={setDateRange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Export Format</label>
            <div className="flex gap-2">
              {["pdf", "csv"].map((format) => (
                <button
                  key={format}
                  onClick={() => setExportFormat(format)}
                  className={cn(
                    "flex-1 px-4 py-3 rounded-lg border transition-all duration-200 font-medium",
                    exportFormat === format
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-surface-300 bg-white text-surface-700 hover:border-surface-400"
                  )}
                >
                  <ApperIcon 
                    name={format === "pdf" ? "FileText" : "Table"} 
                    className="w-4 h-4 mr-2 inline" 
                  />
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-surface-200">
          <Button
            onClick={handleGenerate}
            loading={isGenerating}
            disabled={!selectedReport || !dateRange}
            className="w-full md:w-auto"
            icon="Download"
          >
            {isGenerating ? "Generating Report..." : "Generate Report"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReportBuilder;