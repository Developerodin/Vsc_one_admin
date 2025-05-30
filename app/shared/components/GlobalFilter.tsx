import React from 'react';

interface FilterOption {
  label: string;
  value: string;
}

interface GlobalFilterProps {
  filters: FilterOption[];
  onFilterChange: (filterType: string, value: string) => void;
  className?: string;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({ filters, onFilterChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {filters.map((filter) => (
        <div key={filter.value} className="flex items-center gap-1">
          <label className="text-xs font-medium text-gray-600 whitespace-nowrap">{filter.label}:</label>
          <input
            type="text"
            className="form-control !py-1 !px-2 !text-xs !w-32"
            placeholder={`Filter ${filter.label}`}
            onChange={(e) => onFilterChange(filter.value, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default GlobalFilter; 