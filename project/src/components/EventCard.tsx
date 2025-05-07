import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { formatDate, getEventTypeColor, getEventTypeLabel } from '../utils/filters';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const typeStyle = getEventTypeColor(event.type);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
      {event.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24"></div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}>
            {getEventTypeLabel(event.type)}
          </span>
          
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(event.date)}</span>
          </div>
        </div>
        
        <h3 className="mt-3 text-xl font-semibold text-gray-900 leading-tight">
          {event.title}
        </h3>
        
        <div className="mt-2 flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
        </div>
        
        <div className="mt-1 text-gray-600 text-sm">
          {event.college}
        </div>
        
        <p className="mt-3 text-gray-600 line-clamp-3">
          {event.description}
        </p>
        
        <div className="mt-5 flex items-center justify-between">
          <Link 
            to={`/event/${event.id}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition"
          >
            View Details
          </Link>
          
          <a 
            href={event.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-teal-600 hover:text-teal-800 font-medium text-sm transition"
          >
            <span>Visit Website</span>
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;