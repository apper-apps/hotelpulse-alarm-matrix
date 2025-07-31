import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
    preset: "today",
    label: "Today"
  });

  return (
    <div className="min-h-screen bg-surface-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-64">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ dateRange }} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;