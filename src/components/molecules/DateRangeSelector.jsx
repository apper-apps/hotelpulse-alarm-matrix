import { useState } from "react";
import { format, subDays, startOfWeek, startOfMonth, startOfQuarter, startOfYear } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const DateRangeSelector = ({ value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const presets = [
    { label: "Today", value: "today", getDates: () => ({ start: new Date(), end: new Date() }) },
    { label: "Yesterday", value: "yesterday", getDates: () => ({ start: subDays(new Date(), 1), end: subDays(new Date(), 1) }) },
    { label: "Last 7 days", value: "week", getDates: () => ({ start: subDays(new Date(), 7), end: new Date() }) },
    { label: "Last 30 days", value: "month", getDates: () => ({ start: subDays(new Date(), 30), end: new Date() }) },
    { label: "This week", value: "thisWeek", getDates: () => ({ start: startOfWeek(new Date()), end: new Date() }) },
    { label: "This month", value: "thisMonth", getDates: () => ({ start: startOfMonth(new Date()), end: new Date() }) },
    { label: "This quarter", value: "thisQuarter", getDates: () => ({ start: startOfQuarter(new Date()), end: new Date() }) },
    { label: "This year", value: "thisYear", getDates: () => ({ start: startOfYear(new Date()), end: new Date() }) },
  ];

  const handlePresetSelect = (preset) => {
    const dates = preset.getDates();
    onChange({
      start: dates.start,
      end: dates.end,
      preset: preset.value,
      label: preset.label
    });
    setIsOpen(false);
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onChange({
        start: new Date(customStart),
        end: new Date(customEnd),
        preset: "custom",
        label: `${format(new Date(customStart), "MMM d")} - ${format(new Date(customEnd), "MMM d")}`
      });
      setIsOpen(false);
    }
  };

  const displayLabel = value?.label || "Select date range";

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        icon="Calendar"
        className="min-w-[200px] justify-between"
      >
        {displayLabel}
        <ApperIcon name={isOpen ? "ChevronUp" : "ChevronDown"} className="w-4 h-4 ml-2" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-surface-200 rounded-lg shadow-xl z-50 p-4">
          <div className="space-y-2 mb-4">
            <h4 className="font-display font-semibold text-surface-900">Quick Select</h4>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handlePresetSelect(preset)}
                  className={cn(
                    "px-3 py-2 text-sm text-left rounded-md transition-colors",
                    "hover:bg-surface-100 text-surface-700 hover:text-surface-900",
                    value?.preset === preset.value && "bg-primary-100 text-primary-800"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-surface-200 pt-4">
            <h4 className="font-display font-semibold text-surface-900 mb-3">Custom Range</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">Start Date</label>
                <Input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">End Date</label>
                <Input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleCustomApply}
                  disabled={!customStart || !customEnd}
                  className="flex-1"
                >
                  Apply
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;