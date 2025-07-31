import { useMemo } from "react";
import Chart from "react-apexcharts";
import ChartContainer from "@/components/molecules/ChartContainer";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";

const ChartsGrid = ({ data, isLoading }) => {
  const chartOptions = {
    chart: {
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
      animations: { enabled: true, easing: "easeinout", speed: 800 }
    },
    colors: ["#1e40af", "#7c3aed", "#06b6d4", "#10b981", "#f59e0b"],
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 3,
    },
    tooltip: {
      theme: "light",
      style: { fontSize: "12px" }
    }
  };

  const occupancyChartConfig = useMemo(() => ({
    options: {
      ...chartOptions,
      xaxis: {
        categories: data?.occupancyData?.map(d => d.date) || [],
        labels: { style: { colors: "#64748b" } }
      },
      yaxis: {
        labels: { 
          style: { colors: "#64748b" },
          formatter: (val) => `${val}%`
        }
      },
      stroke: { curve: "smooth", width: 3 },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
        }
      }
    },
    series: [{
      name: "Occupancy Rate",
      data: data?.occupancyData?.map(d => d.rate) || []
    }]
  }), [data?.occupancyData]);

  const revenueByRoomChartConfig = useMemo(() => ({
    options: {
      ...chartOptions,
      xaxis: {
        categories: data?.revenueByRoom?.map(d => d.roomType) || [],
        labels: { style: { colors: "#64748b" } }
      },
      yaxis: {
        labels: { 
          style: { colors: "#64748b" },
          formatter: (val) => `$${(val / 1000).toFixed(0)}K`
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: "60%",
          dataLabels: { position: "top" }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `$${(val / 1000).toFixed(1)}K`,
        offsetY: -20,
        style: { colors: ["#374151"] }
      }
    },
    series: [{
      name: "Revenue",
      data: data?.revenueByRoom?.map(d => d.revenue) || []
    }]
  }), [data?.revenueByRoom]);

  const adrTrendsChartConfig = useMemo(() => ({
    options: {
      ...chartOptions,
      xaxis: {
        categories: data?.adrTrends?.map(d => d.date) || [],
        labels: { style: { colors: "#64748b" } }
      },
      yaxis: {
        labels: { 
          style: { colors: "#64748b" },
          formatter: (val) => `$${val}`
        }
      },
      stroke: { curve: "smooth", width: 3 },
      markers: { size: 5, hover: { size: 7 } }
    },
    series: [{
      name: "Average Daily Rate",
      data: data?.adrTrends?.map(d => d.rate) || []
    }]
  }), [data?.adrTrends]);

  const seasonalBookingsChartConfig = useMemo(() => ({
    options: {
      ...chartOptions,
      plotOptions: {
        heatmap: {
          radius: 4,
          enableShades: false,
          colorScale: {
            ranges: [
              { from: 0, to: 20, color: "#dbeafe" },
              { from: 21, to: 40, color: "#93c5fd" },
              { from: 41, to: 60, color: "#60a5fa" },
              { from: 61, to: 80, color: "#3b82f6" },
              { from: 81, to: 100, color: "#1e40af" }
            ]
          }
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yaxis: {
        categories: ["Week 1", "Week 2", "Week 3", "Week 4"]
      }
    },
    series: data?.seasonalBookings || []
  }), [data?.seasonalBookings]);

  if (isLoading) {
    return <Loading variant="skeleton" />;
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <Empty
        title="No chart data available"
        description="Analytics data will appear here once your hotel starts receiving bookings and generating revenue."
        icon="BarChart"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartContainer title="Occupancy Rate Trends">
        <Chart
          options={occupancyChartConfig.options}
          series={occupancyChartConfig.series}
          type="area"
          height="100%"
        />
      </ChartContainer>

      <ChartContainer title="Revenue by Room Type">
        <Chart
          options={revenueByRoomChartConfig.options}
          series={revenueByRoomChartConfig.series}
          type="bar"
          height="100%"
        />
      </ChartContainer>

      <ChartContainer title="Average Daily Rate Trends">
        <Chart
          options={adrTrendsChartConfig.options}
          series={adrTrendsChartConfig.series}
          type="line"
          height="100%"
        />
      </ChartContainer>

      <ChartContainer title="Seasonal Booking Patterns">
        <Chart
          options={seasonalBookingsChartConfig.options}
          series={seasonalBookingsChartConfig.series}
          type="heatmap"
          height="100%"
        />
      </ChartContainer>
    </div>
  );
};

export default ChartsGrid;