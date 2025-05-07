import { Event, FilterOptions, EventType } from '../types';

export const filterEvents = (events: Event[], filters: FilterOptions): Event[] => {
  return events.filter(event => {
    // Search text filter
    if (filters.search && !eventMatchesSearch(event, filters.search)) {
      return false;
    }

    // Date range filter
    if (!eventMatchesDateRange(event, filters.dateRange)) {
      return false;
    }

    // Event types filter
    if (filters.eventTypes.length > 0 && !filters.eventTypes.includes(event.type)) {
      return false;
    }

    // Colleges filter
    if (filters.colleges.length > 0 && !filters.colleges.includes(event.college)) {
      return false;
    }

    // Locations filter
    if (filters.locations.length > 0 && !filters.locations.includes(event.location)) {
      return false;
    }

    // Event passes all filters
    return true;
  });
};

// Helper function to check if event matches search text
const eventMatchesSearch = (event: Event, searchText: string): boolean => {
  const searchLower = searchText.toLowerCase();
  return (
    event.title.toLowerCase().includes(searchLower) ||
    event.description.toLowerCase().includes(searchLower) ||
    event.college.toLowerCase().includes(searchLower) ||
    event.location.toLowerCase().includes(searchLower)
  );
};

// Helper function to check if event matches date range
const eventMatchesDateRange = (
  event: Event,
  dateRange: { start: string | null; end: string | null }
): boolean => {
  if (!dateRange.start && !dateRange.end) {
    return true; // No date filter applied
  }

  const eventDate = new Date(event.date);
  
  if (dateRange.start) {
    const startDate = new Date(dateRange.start);
    if (eventDate < startDate) {
      return false;
    }
  }

  if (dateRange.end) {
    const endDate = new Date(dateRange.end);
    if (eventDate > endDate) {
      return false;
    }
  }

  return true;
};

// Get event type display name
export const getEventTypeLabel = (type: EventType): string => {
  switch (type) {
    case 'hackathon':
      return 'Hackathon';
    case 'tech-talk':
      return 'Tech Talk';
    case 'workshop':
      return 'Workshop';
    case 'conference':
      return 'Conference';
    case 'other':
      return 'Other';
    default:
      return type;
  }
};

// Get event type color
export const getEventTypeColor = (type: EventType): { bg: string; text: string } => {
  switch (type) {
    case 'hackathon':
      return { bg: 'bg-indigo-100', text: 'text-indigo-800' };
    case 'tech-talk':
      return { bg: 'bg-blue-100', text: 'text-blue-800' };
    case 'workshop':
      return { bg: 'bg-teal-100', text: 'text-teal-800' };
    case 'conference':
      return { bg: 'bg-purple-100', text: 'text-purple-800' };
    case 'other':
      return { bg: 'bg-gray-100', text: 'text-gray-800' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800' };
  }
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Sort events by date (newest first)
export const sortEventsByDate = (events: Event[]): Event[] => {
  return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Event type options for filters
export const eventTypeOptions: { value: EventType; label: string }[] = [
  { value: 'hackathon', label: 'Hackathon' },
  { value: 'tech-talk', label: 'Tech Talk' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'conference', label: 'Conference' },
  { value: 'other', label: 'Other' }
];