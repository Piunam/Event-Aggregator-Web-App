import React from 'react';
import { PlusCircle } from 'lucide-react';
import EventForm from '../components/EventForm';
import { Event } from '../types';

const SubmitEvent: React.FC = () => {
  const handleSubmit = (eventData: Omit<Event, 'id'>) => {
    // In a real app, this would be an API call to save the event
    console.log('Event submitted:', eventData);
    
    // Here you would typically send this data to your backend
    // For now, we'll just log it to the console
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white mb-4">
              Share Your Tech Event
            </h1>
            <p className="text-teal-100 text-lg">
              Help the community discover exciting tech events at your college or university.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-3xl mx-auto">
          <EventForm onSubmit={handleSubmit} />
          
          <div className="mt-8 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-900 mb-3 flex items-center">
              <PlusCircle className="mr-2 h-5 w-5 text-indigo-700" />
              Why Submit Your Event?
            </h3>
            <ul className="space-y-2 text-indigo-900">
              <li className="flex items-start">
                <span className="inline-block h-6 w-6 rounded-full bg-indigo-200 text-indigo-700 text-center font-medium mr-2 flex-shrink-0">1</span>
                <span>Increase visibility to a targeted audience of tech students and professionals</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block h-6 w-6 rounded-full bg-indigo-200 text-indigo-700 text-center font-medium mr-2 flex-shrink-0">2</span>
                <span>Attract more diverse participants to your hackathons, workshops, and talks</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block h-6 w-6 rounded-full bg-indigo-200 text-indigo-700 text-center font-medium mr-2 flex-shrink-0">3</span>
                <span>Connect with other universities and tech communities</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block h-6 w-6 rounded-full bg-indigo-200 text-indigo-700 text-center font-medium mr-2 flex-shrink-0">4</span>
                <span>All listings are free and remain active until after the event date</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitEvent;