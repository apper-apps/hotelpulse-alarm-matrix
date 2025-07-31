import { NavLink, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    { path: "/", label: "Dashboard", icon: "BarChart3" },
    { path: "/reports", label: "Reports", icon: "FileText" },
    { path: "/alerts", label: "Alerts", icon: "Bell" },
  ];

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <NavLink
        to={item.path}
        onClick={onClose}
        className={cn(
          "nav-item group",
          isActive && "nav-item-active"
        )}
      >
        <ApperIcon 
          name={item.icon} 
          className={cn(
            "w-5 h-5 mr-3 transition-colors",
            isActive ? "text-white" : "text-surface-500 group-hover:text-primary-600"
          )} 
        />
        <span className="font-medium">{item.label}</span>
        {isActive && (
          <div className="absolute right-0 w-1 h-8 bg-white/30 rounded-l-full" />
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-surface-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
              <ApperIcon name="Hotel" className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-display font-bold text-surface-900">HotelPulse</h1>
          </div>
          
          <nav className="mt-5 flex-1 px-2 space-y-2">
            {navigationItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </nav>

          <div className="flex-shrink-0 px-4 py-4 border-t border-surface-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-4 h-4 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-surface-900">Hotel Manager</p>
                <p className="text-xs text-surface-500">Grand Plaza Hotel</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={cn(
        "lg:hidden fixed inset-0 flex z-40 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="fixed inset-0 bg-surface-600 bg-opacity-75" onClick={onClose} />
        
        <div className={cn(
          "relative flex-1 flex flex-col max-w-xs w-full bg-white transition-transform duration-300 ease-in-out",
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        )}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              onClick={onClose}
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <ApperIcon name="X" className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                <ApperIcon name="Hotel" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-display font-bold text-surface-900">HotelPulse</h1>
            </div>
            
            <nav className="mt-5 px-2 space-y-2">
              {navigationItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </nav>
          </div>

          <div className="flex-shrink-0 px-4 py-4 border-t border-surface-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-4 h-4 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-surface-900">Hotel Manager</p>
                <p className="text-xs text-surface-500">Grand Plaza Hotel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;