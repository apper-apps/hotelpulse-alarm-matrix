import { motion } from "framer-motion";
import KPICard from "@/components/molecules/KPICard";

const DashboardKPIs = ({ metrics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-surface-200 h-32 rounded-xl"></div>
          </div>
        ))}
      </div>
    );
  }

  const kpiData = [
    {
      title: "Total Revenue",
      value: metrics?.totalRevenue || 0,
      previousValue: metrics?.previousRevenue || 0,
      format: "currency",
      icon: "DollarSign",
      trend: metrics?.revenueTrend || []
    },
    {
      title: "Occupancy Rate",
      value: metrics?.occupancyRate || 0,
      previousValue: metrics?.previousOccupancy || 0,
      format: "percentage",
      icon: "Users",
      trend: metrics?.occupancyTrend || []
    },
    {
      title: "Average Daily Rate",
      value: metrics?.adr || 0,
      previousValue: metrics?.previousAdr || 0,
      format: "currency",
      icon: "TrendingUp",
      trend: metrics?.adrTrend || []
    },
    {
      title: "RevPAR",
      value: metrics?.revpar || 0,
      previousValue: metrics?.previousRevpar || 0,
      format: "currency",
      icon: "Target",
      trend: metrics?.revparTrend || []
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <KPICard {...kpi} />
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardKPIs;