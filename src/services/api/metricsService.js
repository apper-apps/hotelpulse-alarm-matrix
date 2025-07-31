import dailyMetricsData from "@/services/mockData/dailyMetrics.json";
import roomTypeRevenueData from "@/services/mockData/roomTypeRevenue.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const metricsService = {
  async getDashboardMetrics(dateRange) {
    await delay(300);
    
    try {
      const currentMetrics = dailyMetricsData[0];
      const previousMetrics = dailyMetricsData[1];
      
      // Generate trend data (last 7 days)
      const trendData = dailyMetricsData.slice(0, 7).reverse();
      
      return {
        totalRevenue: currentMetrics.revenue,
        previousRevenue: previousMetrics.revenue,
        revenueTrend: trendData.map(d => d.revenue / 1000), // Simplified for sparkline
        
        occupancyRate: currentMetrics.occupancyRate,
        previousOccupancy: previousMetrics.occupancyRate,
        occupancyTrend: trendData.map(d => d.occupancyRate),
        
        adr: currentMetrics.adr,
        previousAdr: previousMetrics.adr,
        adrTrend: trendData.map(d => d.adr),
        
        revpar: currentMetrics.revpar,
        previousRevpar: previousMetrics.revpar,
        revparTrend: trendData.map(d => d.revpar),
      };
    } catch (error) {
      throw new Error("Failed to fetch dashboard metrics");
    }
  },

  async getChartData(dateRange) {
    await delay(400);
    
    try {
      // Occupancy data for line chart
      const occupancyData = dailyMetricsData.slice(0, 10).reverse().map(d => ({
        date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate: d.occupancyRate
      }));

      // Revenue by room type for bar chart
      const revenueByRoom = roomTypeRevenueData.map(d => ({
        roomType: d.roomType,
        revenue: d.revenue
      }));

      // ADR trends for line chart
      const adrTrends = dailyMetricsData.slice(0, 15).reverse().map(d => ({
        date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate: d.adr
      }));

      // Seasonal booking patterns (heatmap data)
      const seasonalBookings = [
        {
          name: "Week 1",
          data: [65, 72, 78, 85, 92, 88, 95, 87, 82, 76, 69, 73]
        },
        {
          name: "Week 2", 
          data: [68, 75, 81, 88, 94, 91, 97, 89, 85, 79, 72, 76]
        },
        {
          name: "Week 3",
          data: [71, 78, 84, 91, 96, 93, 98, 92, 87, 82, 75, 79]
        },
        {
          name: "Week 4",
          data: [63, 70, 76, 83, 89, 86, 93, 85, 80, 74, 67, 71]
        }
      ];

      return {
        occupancyData,
        revenueByRoom,
        adrTrends,
        seasonalBookings
      };
    } catch (error) {
      throw new Error("Failed to fetch chart data");
    }
  }
};