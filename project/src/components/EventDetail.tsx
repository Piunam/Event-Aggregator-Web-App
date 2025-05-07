import React from 'react';
import { Calendar, MapPin, School, ExternalLink, Clock } from 'lucide-react';
import { Event } from '../types';
import { formatDate, getEventTypeColor, getEventTypeLabel } from '../utils/filters';

interface EventDetailProps {
  event: Event;
}

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  const typeStyle = getEventTypeColor(event.type);
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Event Header Banner */}
      <div className="relative">
        {event.image ? (
          <>
            <div className="h-64 md:h-80">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </>
        ) : (
          <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text}`}>
              {getEventTypeLabel(event.type)}
            </span>
            <span className="text-white/80 text-sm">{event.college}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {event.description}
            </p>
            
            <div className="mt-8">
              <a 
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
              >
                <span>Visit Event Website</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="md:border-l md:pl-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Date & Time</h3>
                  <p className="text-gray-700">{formatDate(event.date)}</p>
                  {event.endDate && (
                    <p className="text-gray-700">
                      To: {formatDate(event.endDate)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <p className="text-gray-700">{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <School className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Hosted by</h3>
                  <p className="text-gray-700">{event.college}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Duration</h3>
                  <p className="text-gray-700">
                    {event.endDate 
                      ? `${Math.ceil((new Date(event.endDate).getTime() - new Date(event.date).getTime()) / (1000 * 60 * 60 * 24))} days` 
                      : 'Single day event'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <button className="w-full py-2 bg-teal-100 text-teal-800 rounded-md font-medium hover:bg-teal-200 transition">
                Add to Calendar
              </button>
              <button className="w-full mt-3 py-2 bg-orange-100 text-orange-800 rounded-md font-medium hover:bg-orange-200 transition">
                Share Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;