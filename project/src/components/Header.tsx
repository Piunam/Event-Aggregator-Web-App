import React, { useState, useEffect } from 'react';
import { Calendar, Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">EventScope</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/submit" 
              className={`font-medium transition-colors ${
                isActive('/submit') 
                  ? 'text-indigo-600' 
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Submit Event
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Find Events</span>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium ${isActive('/') ? 'text-indigo-600' : 'text-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/submit" 
              className={`font-medium ${isActive('/submit') ? 'text-indigo-600' : 'text-gray-700'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Submit Event
            </Link>
            <Link 
              to="/" 
              className="flex items-center justify-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="h-4 w-4" />
              <span>Find Events</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;