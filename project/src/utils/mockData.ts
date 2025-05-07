import { Event } from '../types';

// Helper to generate random dates between now and the next 90 days
const getRandomFutureDate = (maxDaysInFuture = 90) => {
  const now = new Date();
  const futureDate = new Date(now);
  const randomDays = Math.floor(Math.random() * maxDaysInFuture) + 1;
  futureDate.setDate(now.getDate() + randomDays);
  return futureDate.toISOString().split('T')[0];
};

// Mock college names
const colleges = [
  'MIT',
  'Stanford University',
  'Harvard University',
  'UC Berkeley',
  'Carnegie Mellon University',
  'Georgia Tech',
  'Caltech',
  'Princeton University',
  'Cornell University',
  'University of Washington'
];

// Mock locations
const locations = [
  'Boston, MA',
  'Palo Alto, CA',
  'Cambridge, MA',
  'Berkeley, CA',
  'Pittsburgh, PA',
  'Atlanta, GA',
  'Pasadena, CA',
  'Princeton, NJ',
  'Ithaca, NY',
  'Seattle, WA',
  'Virtual'
];

// Mock event images
const eventImages = [
  'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg',
  'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg',
  'https://images.pexels.com/photos/7669619/pexels-photo-7669619.jpeg',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
  'https://images.pexels.com/photos/7256897/pexels-photo-7256897.jpeg',
  'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
];

// Generate mock events
export const events: Event[] = [
  {
    id: '1',
    title: 'Annual Hackathon 2025',
    description: 'Join us for a 48-hour coding challenge to build innovative solutions for real-world problems. Open to all students regardless of experience level.',
    date: getRandomFutureDate(30),
    endDate: getRandomFutureDate(32), // 2 days after start
    location: 'Boston, MA',
    college: 'MIT',
    type: 'hackathon',
    link: 'https://example.com/mit-hackathon',
    image: eventImages[0]
  },
  {
    id: '2',
    title: 'AI Research Symposium',
    description: 'Leading researchers will present their latest findings in artificial intelligence and machine learning.',
    date: getRandomFutureDate(45),
    location: 'Palo Alto, CA',
    college: 'Stanford University',
    type: 'tech-talk',
    link: 'https://example.com/stanford-ai-symposium',
    image: eventImages[1]
  },
  {
    id: '3',
    title: 'Web Development Workshop',
    description: 'Learn the fundamentals of modern web development with React, Node.js, and MongoDB.',
    date: getRandomFutureDate(15),
    location: 'Virtual',
    college: 'Harvard University',
    type: 'workshop',
    link: 'https://example.com/harvard-webdev',
    image: eventImages[2]
  },
  {
    id: '4',
    title: 'Blockchain & Crypto Conference',
    description: 'Explore the future of blockchain technology and cryptocurrency with industry experts and researchers.',
    date: getRandomFutureDate(60),
    endDate: getRandomFutureDate(62), // 2 days after start
    location: 'Berkeley, CA',
    college: 'UC Berkeley',
    type: 'conference',
    link: 'https://example.com/berkeley-blockchain',
    image: eventImages[3]
  },
  {
    id: '5',
    title: 'Robotics Workshop Series',
    description: 'A hands-on workshop series covering robotics fundamentals, from hardware integration to software programming.',
    date: getRandomFutureDate(20),
    location: 'Pittsburgh, PA',
    college: 'Carnegie Mellon University',
    type: 'workshop',
    link: 'https://example.com/cmu-robotics',
    image: eventImages[4]
  },
  {
    id: '6',
    title: 'Cybersecurity Hackathon',
    description: 'Put your security skills to the test in this intensive weekend hackathon focused on identifying and patching vulnerabilities.',
    date: getRandomFutureDate(40),
    endDate: getRandomFutureDate(42), // 2 days after start
    location: 'Atlanta, GA',
    college: 'Georgia Tech',
    type: 'hackathon',
    link: 'https://example.com/gatech-cybersec',
    image: eventImages[5]
  },
  {
    id: '7',
    title: 'Quantum Computing Lecture Series',
    description: 'An introductory lecture series on quantum computing principles and applications, suitable for undergraduate students.',
    date: getRandomFutureDate(25),
    location: 'Pasadena, CA',
    college: 'Caltech',
    type: 'tech-talk',
    link: 'https://example.com/caltech-quantum',
    image: eventImages[0]
  },
  {
    id: '8',
    title: 'Data Science Bootcamp',
    description: 'An intensive three-day bootcamp covering essential data science tools, techniques, and methodologies.',
    date: getRandomFutureDate(35),
    endDate: getRandomFutureDate(38), // 3 days after start
    location: 'Princeton, NJ',
    college: 'Princeton University',
    type: 'workshop',
    link: 'https://example.com/princeton-datasci',
    image: eventImages[1]
  },
  {
    id: '9',
    title: 'Startup Innovation Challenge',
    description: 'Present your startup idea to a panel of venture capitalists and industry experts for a chance to win seed funding.',
    date: getRandomFutureDate(55),
    location: 'Ithaca, NY',
    college: 'Cornell University',
    type: 'other',
    link: 'https://example.com/cornell-startup',
    image: eventImages[2]
  },
  {
    id: '10',
    title: 'Cloud Computing Workshop',
    description: 'Learn to architect, deploy, and manage applications on major cloud platforms including AWS, Azure, and GCP.',
    date: getRandomFutureDate(10),
    location: 'Seattle, WA',
    college: 'University of Washington',
    type: 'workshop',
    link: 'https://example.com/uw-cloud',
    image: eventImages[3]
  },
  {
    id: '11',
    title: 'Women in Tech Symposium',
    description: 'A day-long event featuring talks, panels, and networking opportunities focused on supporting women in technology fields.',
    date: getRandomFutureDate(50),
    location: 'Virtual',
    college: 'Stanford University',
    type: 'conference',
    link: 'https://example.com/stanford-womenintech',
    image: eventImages[4]
  },
  {
    id: '12',
    title: 'Mobile App Development Workshop',
    description: 'A practical workshop on building cross-platform mobile applications using React Native and Flutter.',
    date: getRandomFutureDate(5),
    location: 'Boston, MA',
    college: 'MIT',
    type: 'workshop',
    link: 'https://example.com/mit-mobiledev',
    image: eventImages[5]
  }
];

// Extract unique colleges and locations for filters
export const uniqueColleges = [...new Set(events.map(event => event.college))];
export const uniqueLocations = [...new Set(events.map(event => event.location))];