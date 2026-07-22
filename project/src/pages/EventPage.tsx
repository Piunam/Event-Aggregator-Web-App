import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Event } from '../types';
import EventDetail from '../components/EventDetail';
import { fetchEventById } from '../lib/events';

const EventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Event not found');
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchEventById(id)
      .then(found => {
        if (cancelled) return;
        if (found) {
          setEvent(found);
        } else {
          setError('Event not found');
        }
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load event');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Event not found'}</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the event you're looking for. It may have been removed or the URL might be incorrect.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Events</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link 
          to="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-6 transition"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to All Events</span>
        </Link>
        
        <EventDetail event={event} />
      </div>
    </div>
  );
};

export default EventPage;