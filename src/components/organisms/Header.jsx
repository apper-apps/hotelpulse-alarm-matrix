import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import DateRangeSelector from "@/components/molecules/DateRangeSelector";
import { cn } from "@/utils/cn";

const Header = ({ onMenuClick, dateRange, onDateRangeChange, showDateSelector = true }) => {
  const [notificationCount] = useState(3);

  return (
    <header className="bg-white border-b border-surface-200 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            icon="Menu"
            onClick={onMenuClick}
            className="lg:hidden mr-2 text-surface-600"
          />
          
          <div className="hidden lg:block">
            <h1 className="text-2xl font-display font-bold text-surface-900">
              Hotel Analytics Dashboard
            </h1>
            <p className="text-sm text-surface-600">
              Monitor performance and generate insights
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {showDateSelector && (
            <DateRangeSelector
              value={dateRange}
              onChange={onDateRangeChange}
              className="hidden sm:block"
            />
          )}

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <ApperIcon name="Bell" className="w-5 h-5 text-surface-600" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="sm">
              <ApperIcon name="Settings" className="w-5 h-5 text-surface-600" />
            </Button>
          </div>
        </div>
      </div>

      {showDateSelector && (
        <div className="pb-4 sm:hidden">
          <DateRangeSelector
            value={dateRange}
            onChange={onDateRangeChange}
          />
        </div>
      )}
    </header>
  );
};

export default Header;