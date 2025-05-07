import React, { useState } from 'react';
import { X, Filter, Calendar, MapPin, School, Tag } from 'lucide-react';
import { FilterOptions, EventType } from '../types';
import { eventTypeOptions } from '../utils/filters';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  uniqueColleges: string[];
  uniqueLocations: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  filters, 
  onFilterChange, 
  uniqueColleges,
  uniqueLocations 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Helper to update search text
  const updateSearch = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };
  
  // Helper to update date range
  const updateDateRange = (field: 'start' | 'end', value: string) => {
    onFilterChange({
      ...filters,
      dateRange: { ...filters.dateRange, [field]: value || null }
    });
  };
  
  // Helper to toggle event type
  const toggleEventType = (type: EventType) => {
    const newTypes = filters.eventTypes.includes(type)
      ? filters.eventTypes.filter(t => t !== type)
      : [...filters.eventTypes, type];
    onFilterChange({ ...filters, eventTypes: newTypes });
  };
  
  // Helper to toggle college
  const toggleCollege = (college: string) => {
    const newColleges = filters.colleges.includes(college)
      ? filters.colleges.filter(c => c !== college)
      : [...filters.colleges, college];
    onFilterChange({ ...filters, colleges: newColleges });
  };
  
  // Helper to toggle location
  const toggleLocation = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location];
    onFilterChange({ ...filters, locations: newLocations });
  };
  
  // Clear all filters
  const clearFilters = () => {
    onFilterChange({
      search: '',
      dateRange: { start: null, end: null },
      eventTypes: [],
      colleges: [],
      locations: []
    });
  };
  
  // Check if any filters are active
  const hasActiveFilters = 
    filters.search !== '' || 
    filters.dateRange.start !== null || 
    filters.dateRange.end !== null || 
    filters.eventTypes.length > 0 || 
    filters.colleges.length > 0 || 
    filters.locations.length > 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 transition-all">
      {/* Search Bar */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search events, colleges, keywords..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={filters.search}
          onChange={(e) => updateSearch(e.target.value)}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md transition-colors flex items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Filter className="h-4 w-4 mr-2" />
          <span>Filters</span>
        </button>
      </div>
      
      {/* Active Filters Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.search && (
            <div className="bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1 flex items-center">
              <span>Search: {filters.search}</span>
              <button 
                onClick={() => updateSearch('')}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {filters.dateRange.start && (
            <div className="bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>From: {filters.dateRange.start}</span>
              <button 
                onClick={() => updateDateRange('start', '')}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {filters.dateRange.end && (
            <div className="bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>To: {filters.dateRange.end}</span>
              <button 
                onClick={() => updateDateRange('end', '')}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {filters.eventTypes.map(type => (
            <div 
              key={type} 
              className="bg-indigo-100 text-indigo-800 text-sm rounded-full px-3 py-1 flex items-center"
            >
              <Tag className="h-3 w-3 mr-1" />
              <span>{type}</span>
              <button 
                onClick={() => toggleEventType(type)}
                className="ml-2 text-indigo-500 hover:text-indigo-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          
          {filters.colleges.map(college => (
            <div 
              key={college} 
              className="bg-teal-100 text-teal-800 text-sm rounded-full px-3 py-1 flex items-center"
            >
              <School className="h-3 w-3 mr-1" />
              <span>{college}</span>
              <button 
                onClick={() => toggleCollege(college)}
                className="ml-2 text-teal-500 hover:text-teal-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          
          {filters.locations.map(location => (
            <div 
              key={location} 
              className="bg-orange-100 text-orange-800 text-sm rounded-full px-3 py-1 flex items-center"
            >
              <MapPin className="h-3 w-3 mr-1" />
              <span>{location}</span>
              <button 
                onClick={() => toggleLocation(location)}
                className="ml-2 text-orange-500 hover:text-orange-700"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          
          <button 
            onClick={clearFilters}
            className="bg-red-100 text-red-800 text-sm rounded-full px-3 py-1 flex items-center hover:bg-red-200 transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
      
      {/* Expanded Filter Section */}
      {isExpanded && (
        <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Date Range Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-indigo-600" />
              Date Range
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-500 block">From</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={filters.dateRange.start || ''}
                  onChange={(e) => updateDateRange('start', e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block">To</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={filters.dateRange.end || ''}
                  onChange={(e) => updateDateRange('end', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Event Type Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Tag className="h-4 w-4 mr-1 text-indigo-600" />
              Event Type
            </h3>
            <div className="space-y-1">
              {eventTypeOptions.map(option => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={filters.eventTypes.includes(option.value)}
                    onChange={() => toggleEventType(option.value)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* College & Location Filter */}
          <div className="space-y-4">
            {/* College Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <School className="h-4 w-4 mr-1 text-indigo-600" />
                College
              </h3>
              <div className="space-y-1 max-h-32 overflow-y-auto pr-2">
                {uniqueColleges.map(college => (
                  <label key={college} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={filters.colleges.includes(college)}
                      onChange={() => toggleCollege(college)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{college}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Location Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-indigo-600" />
                Location
              </h3>
              <div className="space-y-1 max-h-32 overflow-y-auto pr-2">
                {uniqueLocations.map(location => (
                  <label key={location} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={filters.locations.includes(location)}
                      onChange={() => toggleLocation(location)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{location}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;