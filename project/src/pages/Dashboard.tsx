import React, { useState, useEffect, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { Event, FilterOptions } from '../types';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';
import { fetchEvents } from '../lib/events';
import { filterEvents } from '../utils/filters';

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    dateRange: { start: null, end: null },
    eventTypes: [],
    colleges: [],
    locations: []
  });

  // Load events from Supabase
  useEffect(() => {
    let cancelled = false;

    fetchEvents()
      .then(data => {
        if (!cancelled) setEvents(data);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load events. Please try again later.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const uniqueColleges = useMemo(
    () => [...new Set(events.map(event => event.college))],
    [events]
  );
  const uniqueLocations = useMemo(
    () => [...new Set(events.map(event => event.location))],
    [events]
  );

  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters]
  );

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Discover Tech Events from Top Universities
            </h1>
            <p className="text-indigo-100 text-lg mb-6">
              Find hackathons, workshops, tech talks, and conferences from leading colleges around the country.
            </p>
            <div className="flex items-center text-indigo-200">
              <Calendar className="h-5 w-5 mr-2" />
              <span>
                {loading ? 'Loading events…' : `${filteredEvents.length} events available`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          uniqueColleges={uniqueColleges}
          uniqueLocations={uniqueLocations}
        />

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 max-w-lg mx-auto">{error}</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="transform transition-all duration-300 hover:scale-[1.02]"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center my-8">
            <div className="text-indigo-600 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No events found</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              We couldn't find any events matching your current filters. Try adjusting your search criteria or clearing some filters to see more events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;