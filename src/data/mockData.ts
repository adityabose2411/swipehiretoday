import { User, Match, Meetup, SwipeProfile } from '@/types';

export const mockProfiles: SwipeProfile[] = [
  {
    id: '1',
    matchScore: 92,
    user: {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya@techcorp.com',
      role: 'candidate',
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      title: 'Senior Product Designer',
      company: 'Google',
      industry: 'Technology',
      experienceLevel: 'Senior (5-8 years)',
      skills: ['UI/UX Design', 'Figma', 'Design Systems', 'User Research', 'Prototyping'],
      bio: 'Passionate about creating human-centered designs that solve real problems. 6+ years crafting digital experiences for Fortune 500 companies.',
      location: 'Bangalore, India',
      availability: 'open',
      workCulturePreferences: ['Remote-first', 'Innovation-driven', 'Flat hierarchy'],
      achievements: [
        { id: '1', title: 'Design Award 2024', description: 'Best Mobile App Design', date: '2024-03' },
        { id: '2', title: 'Speaker at DesignCon', description: 'Keynote on AI in Design', date: '2024-01' }
      ],
      projects: [
        { id: '1', title: 'E-commerce Redesign', description: 'Led complete redesign increasing conversions by 40%', status: 'completed', startDate: '2023-06', endDate: '2024-01', skills: ['Figma', 'User Research'] }
      ],
      createdAt: new Date()
    }
  },
  {
    id: '2',
    matchScore: 88,
    user: {
      id: '2',
      name: 'Arjun Kapoor',
      email: 'arjun@startup.io',
      role: 'candidate',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      title: 'Full Stack Engineer',
      company: 'Microsoft',
      industry: 'Technology',
      experienceLevel: 'Mid-level (3-5 years)',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'GraphQL'],
      bio: 'Building scalable systems that millions love. Open source contributor and tech community builder.',
      location: 'Gurgaon, India',
      availability: 'available',
      workCulturePreferences: ['Agile', 'Learning culture', 'Work-life balance'],
      achievements: [
        { id: '1', title: 'Open Source Contributor', description: '500+ GitHub stars', date: '2024-02' }
      ],
      projects: [
        { id: '1', title: 'Real-time Collaboration Tool', description: 'Built a Figma-like collaboration platform', status: 'ongoing', startDate: '2024-01', skills: ['React', 'WebSockets'] }
      ],
      createdAt: new Date()
    }
  },
  {
    id: '3',
    matchScore: 95,
    user: {
      id: '3',
      name: 'Sneha Patel',
      email: 'sneha@fintech.com',
      role: 'hr',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      title: 'Head of Talent Acquisition',
      company: 'Razorpay',
      industry: 'Fintech',
      experienceLevel: 'Leadership (8+ years)',
      skills: ['Talent Strategy', 'Employer Branding', 'DEI', 'Executive Hiring', 'HR Analytics'],
      bio: 'Building world-class teams at Indias leading fintech. Believe in human-first hiring.',
      location: 'Bangalore, India',
      availability: 'available',
      workCulturePreferences: ['High-growth', 'Diverse teams', 'Transparent culture'],
      achievements: [
        { id: '1', title: 'Scaled team 5x', description: 'From 200 to 1000+ employees', date: '2023-12' }
      ],
      projects: [],
      createdAt: new Date()
    }
  },
  {
    id: '4',
    matchScore: 85,
    user: {
      id: '4',
      name: 'Rahul Verma',
      email: 'rahul@enterprise.com',
      role: 'candidate',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      title: 'Data Science Lead',
      company: 'Amazon',
      industry: 'E-commerce',
      experienceLevel: 'Senior (5-8 years)',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'Data Analytics', 'SQL', 'Spark'],
      bio: 'Turning data into decisions. Led ML initiatives that drove $50M+ in revenue impact.',
      location: 'Hyderabad, India',
      availability: 'open',
      workCulturePreferences: ['Data-driven', 'Research-oriented', 'Global exposure'],
      achievements: [
        { id: '1', title: 'Patent Holder', description: 'ML Algorithm for Demand Forecasting', date: '2024-01' }
      ],
      projects: [
        { id: '1', title: 'Recommendation Engine 2.0', description: 'Rebuilt core recommendation system', status: 'completed', startDate: '2023-03', endDate: '2023-09', skills: ['Python', 'TensorFlow'] }
      ],
      createdAt: new Date()
    }
  },
  {
    id: '5',
    matchScore: 91,
    user: {
      id: '5',
      name: 'Ananya Iyer',
      email: 'ananya@creative.co',
      role: 'candidate',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
      title: 'Creative Director',
      company: 'Swiggy',
      industry: 'Food Tech',
      experienceLevel: 'Leadership (8+ years)',
      skills: ['Brand Strategy', 'Creative Direction', 'Team Leadership', 'Marketing', 'Content Strategy'],
      bio: 'Storyteller at heart. Building brands that connect emotionally with millions of users.',
      location: 'Mumbai, India',
      availability: 'available',
      workCulturePreferences: ['Creative freedom', 'Impact-driven', 'Collaborative'],
      achievements: [
        { id: '1', title: 'Cannes Lions Winner', description: 'Gold in Brand Experience', date: '2023-06' }
      ],
      projects: [],
      createdAt: new Date()
    }
  }
];

export const mockMatches: Match[] = [
  {
    id: '1',
    userId1: 'current-user',
    userId2: '3',
    matchedAt: new Date(Date.now() - 86400000),
    status: 'active',
    lastMessageAt: new Date(Date.now() - 3600000)
  },
  {
    id: '2',
    userId1: 'current-user',
    userId2: '5',
    matchedAt: new Date(Date.now() - 172800000),
    status: 'active'
  }
];

export const mockMeetups: Meetup[] = [
  {
    id: '1',
    matchId: '1',
    scheduledBy: 'current-user',
    scheduledWith: '3',
    date: '2025-01-15',
    time: '14:00',
    venueType: 'cafe',
    venueName: 'Blue Tokai Coffee, CyberHub',
    notes: 'Discussing product design opportunities',
    status: 'accepted',
    createdAt: new Date(Date.now() - 86400000)
  }
];

export const currentUser: User = {
  id: 'current-user',
  name: 'Alex Johnson',
  email: 'alex@company.com',
  role: 'hr',
  profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
  title: 'Senior Recruiter',
  company: 'TechStartup Inc.',
  industry: 'Technology',
  experienceLevel: 'Senior (5-8 years)',
  skills: ['Technical Recruiting', 'Talent Strategy', 'Employer Branding'],
  bio: 'Connecting great talent with amazing opportunities.',
  location: 'Delhi NCR, India',
  availability: 'available',
  workCulturePreferences: ['Startup culture', 'Fast-paced', 'Remote-friendly'],
  achievements: [],
  projects: [],
  createdAt: new Date()
};
