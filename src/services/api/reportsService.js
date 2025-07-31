import reportsData from "@/services/mockData/reports.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const reportsService = {
  async getAll() {
    await delay(350);
    
    try {
      return [...reportsData].sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt));
    } catch (error) {
      throw new Error("Failed to fetch reports");
    }
  },

  async getById(id) {
    await delay(200);
    
    try {
      const report = reportsData.find(r => r.Id === parseInt(id));
      if (!report) {
        throw new Error("Report not found");
      }
      return { ...report };
    } catch (error) {
      throw new Error("Failed to fetch report");
    }
  },

  async generate(reportConfig) {
    await delay(2000); // Simulate report generation time
    
    try {
      const maxId = Math.max(...reportsData.map(r => r.Id));
      const newReport = {
        Id: maxId + 1,
        type: reportConfig.type,
        title: this.getReportTitle(reportConfig.type),
        dateRange: {
          start: reportConfig.dateRange.start.toISOString().split('T')[0],
          end: reportConfig.dateRange.end.toISOString().split('T')[0]
        },
        generatedAt: new Date().toISOString(),
        format: reportConfig.format,
        status: "completed",
        data: this.generateMockReportData(reportConfig.type)
      };
      
      reportsData.unshift(newReport);
      return { ...newReport };
    } catch (error) {
      throw new Error("Failed to generate report");
    }
  },

  async delete(id) {
    await delay(250);
    
    try {
      const index = reportsData.findIndex(r => r.Id === parseInt(id));
      if (index === -1) {
        throw new Error("Report not found");
      }
      
      const deletedReport = reportsData.splice(index, 1)[0];
      return { ...deletedReport };
    } catch (error) {
      throw new Error("Failed to delete report");
    }
  },

  getReportTitle(type) {
    const titles = {
      occupancy: "Occupancy Analysis Report",
      revenue: "Revenue Performance Report", 
      "guest-satisfaction": "Guest Satisfaction Report",
      "staff-performance": "Staff Performance Report"
    };
    return titles[type] || "Analytics Report";
  },

  generateMockReportData(type) {
    const mockData = {
      occupancy: {
        averageOccupancy: 84.7,
        peakOccupancy: 96.2,
        lowOccupancy: 67.8,
        totalRoomNights: 2145,
        trends: "Steady upward trend with peak performance on weekends"
      },
      revenue: {
        totalRevenue: 892500,
        roomRevenue: 714750,
        restaurantRevenue: 123800,
        otherRevenue: 53950,
        growthRate: 12.3
      },
      "guest-satisfaction": {
        averageRating: 4.4,
        totalReviews: 1247,
        recommendationRate: 94.2,
        responseTime: 1.8,
        topComplaints: ["WiFi Speed", "Room Temperature", "Checkout Wait"]
      },
      "staff-performance": {
        averagePerformance: 87.3,
        topPerformers: 15,
        trainingNeeded: 8,
        customerServiceRating: 4.6,
        taskCompletionRate: 91.2
      }
    };
    
    return mockData[type] || {};
  }
};