import React, { useState } from 'react';
import { Calendar, MapPin, Tag, Link as LinkIcon, FileText, School } from 'lucide-react';
import { Event, EventType } from '../types';
import { eventTypeOptions } from '../utils/filters';

interface EventFormProps {
  onSubmit: (event: Omit<Event, 'id'>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    endDate: '',
    location: '',
    college: '',
    type: 'workshop' as EventType,
    link: '',
    image: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (formData.endDate && new Date(formData.endDate) < new Date(formData.date)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.college.trim()) {
      newErrors.college = 'College/University is required';
    }
    
    if (!formData.link.trim()) {
      newErrors.link = 'Event link is required';
    } else if (!formData.link.startsWith('http')) {
      newErrors.link = 'Link must start with http:// or https://';
    }
    
    if (formData.image && !formData.image.startsWith('http')) {
      newErrors.image = 'Image URL must start with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setSubmitted(true);
      // Reset form after submission
      setFormData({
        title: '',
        description: '',
        date: '',
        endDate: '',
        location: '',
        college: '',
        type: 'workshop',
        link: '',
        image: ''
      });
    }
  };
  
  const inputClasses = "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const errorClasses = "text-red-600 text-xs mt-1";
  
  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Submitted Successfully!</h2>
        <p className="text-gray-600 mb-6">Thank you for submitting your event. It will be reviewed and added to our listings soon.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
        >
          Submit Another Event
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit a New Event</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className={labelClasses}>
            <span className="flex items-center">
              <FileText className="h-4 w-4 mr-1 text-indigo-600" />
              Event Title
            </span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the name of the event"
            className={inputClasses}
          />
          {errors.title && <p className={errorClasses}>{errors.title}</p>}
        </div>
        
        {/* Event Type */}
        <div>
          <label htmlFor="type" className={labelClasses}>
            <span className="flex items-center">
              <Tag className="h-4 w-4 mr-1 text-indigo-600" />
              Event Type
            </span>
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={inputClasses}
          >
            {eventTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* College/University */}
        <div>
          <label htmlFor="college" className={labelClasses}>
            <span className="flex items-center">
              <School className="h-4 w-4 mr-1 text-indigo-600" />
              College/University
            </span>
          </label>
          <input
            type="text"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="Enter hosting college or university"
            className={inputClasses}
          />
          {errors.college && <p className={errorClasses}>{errors.college}</p>}
        </div>
        
        {/* Start Date */}
        <div>
          <label htmlFor="date" className={labelClasses}>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-indigo-600" />
              Start Date
            </span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClasses}
          />
          {errors.date && <p className={errorClasses}>{errors.date}</p>}
        </div>
        
        {/* End Date (Optional) */}
        <div>
          <label htmlFor="endDate" className={labelClasses}>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-indigo-600" />
              End Date (Optional)
            </span>
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={inputClasses}
          />
          {errors.endDate && <p className={errorClasses}>{errors.endDate}</p>}
        </div>
        
        {/* Location */}
        <div>
          <label htmlFor="location" className={labelClasses}>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-indigo-600" />
              Location
            </span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location (City, State or 'Virtual')"
            className={inputClasses}
          />
          {errors.location && <p className={errorClasses}>{errors.location}</p>}
        </div>
        
        {/* Event Link */}
        <div>
          <label htmlFor="link" className={labelClasses}>
            <span className="flex items-center">
              <LinkIcon className="h-4 w-4 mr-1 text-indigo-600" />
              Event Link
            </span>
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com/event"
            className={inputClasses}
          />
          {errors.link && <p className={errorClasses}>{errors.link}</p>}
        </div>
        
        {/* Image URL (Optional) */}
        <div className="md:col-span-2">
          <label htmlFor="image" className={labelClasses}>
            <span className="flex items-center">
              Image URL (Optional)
            </span>
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={inputClasses}
          />
          {errors.image && <p className={errorClasses}>{errors.image}</p>}
          <p className="text-gray-500 text-xs mt-1">
            Add a URL to an image for your event. Images should be 16:9 ratio for best results.
          </p>
        </div>
        
        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className={labelClasses}>
            <span className="flex items-center">
              <FileText className="h-4 w-4 mr-1 text-indigo-600" />
              Event Description
            </span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the event in detail..."
            rows={5}
            className={inputClasses}
          ></textarea>
          {errors.description && <p className={errorClasses}>{errors.description}</p>}
        </div>
      </div>
      
      <div className="mt-8">
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition font-medium"
        >
          Submit Event
        </button>
        <p className="text-gray-500 text-xs text-center mt-4">
          By submitting this event, you confirm that all provided information is accurate and complete.
        </p>
      </div>
    </form>
  );
};

export default EventForm;