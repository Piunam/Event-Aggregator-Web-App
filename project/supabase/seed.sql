-- Optional: run this after schema.sql to populate a few sample events
-- so the dashboard isn't empty on first run. Safe to skip or delete later.

insert into events (title, description, date, end_date, location, college, type, link, image)
values
  (
    'Annual Hackathon 2026',
    'Join us for a 48-hour coding challenge to build innovative solutions for real-world problems. Open to all students regardless of experience level.',
    '2026-08-14', '2026-08-16',
    'Boston, MA', 'MIT', 'hackathon',
    'https://example.com/mit-hackathon',
    'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg'
  ),
  (
    'AI Research Symposium',
    'Leading researchers will present their latest findings in artificial intelligence and machine learning.',
    '2026-09-02', null,
    'Palo Alto, CA', 'Stanford University', 'tech-talk',
    'https://example.com/stanford-ai-symposium',
    'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg'
  ),
  (
    'Web Development Workshop',
    'Learn the fundamentals of modern web development with React, Node.js, and MongoDB.',
    '2026-08-05', null,
    'Virtual', 'Harvard University', 'workshop',
    'https://example.com/harvard-webdev',
    'https://images.pexels.com/photos/7669619/pexels-photo-7669619.jpeg'
  ),
  (
    'Blockchain & Crypto Conference',
    'Explore the future of blockchain technology and cryptocurrency with industry experts and researchers.',
    '2026-09-20', '2026-09-22',
    'Berkeley, CA', 'UC Berkeley', 'conference',
    'https://example.com/berkeley-blockchain',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
  ),
  (
    'Cybersecurity Hackathon',
    'Put your security skills to the test in this intensive weekend hackathon focused on identifying and patching vulnerabilities.',
    '2026-09-05', '2026-09-07',
    'Atlanta, GA', 'Georgia Tech', 'hackathon',
    'https://example.com/gatech-cybersec',
    'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg'
  ),
  (
    'Cloud Computing Workshop',
    'Learn to architect, deploy, and manage applications on major cloud platforms including AWS, Azure, and GCP.',
    '2026-07-31', null,
    'Seattle, WA', 'University of Washington', 'workshop',
    'https://example.com/uw-cloud',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
  );
