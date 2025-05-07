export type EventType = 'hackathon' | 'tech-talk' | 'workshop' | 'conference' | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  college: string;
  type: EventType;
  link: string;
  image?: string;
}

export interface FilterOptions {
  search: string;
  dateRange: {
    start: string | null;
    end: string | null;
  };
  eventTypes: EventType[];
  colleges: string[];
  locations: string[];
}