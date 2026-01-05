export type UserRole = 'candidate' | 'hr' | 'company';

export type AvailabilityStatus = 'available' | 'open' | 'busy' | 'not-looking';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage: string;
  title: string;
  company?: string;
  industry: string;
  experienceLevel: string;
  skills: string[];
  bio: string;
  location: string;
  availability: AvailabilityStatus;
  workCulturePreferences: string[];
  achievements: Achievement[];
  projects: Project[];
  createdAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'ongoing' | 'completed';
  startDate: string;
  endDate?: string;
  skills: string[];
  link?: string;
}

export interface SwipeProfile {
  id: string;
  user: User;
  matchScore?: number;
}

export interface Match {
  id: string;
  userId1: string;
  userId2: string;
  matchedAt: Date;
  status: 'pending' | 'active' | 'archived';
  lastMessageAt?: Date;
}

export type MeetupVenueType = 'corporate-office' | 'boardroom' | 'cafe' | 'tech-hub' | 'virtual';

export type MeetupStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';

export interface Meetup {
  id: string;
  matchId: string;
  scheduledBy: string;
  scheduledWith: string;
  date: string;
  time: string;
  venueType: MeetupVenueType;
  venueName: string;
  notes?: string;
  status: MeetupStatus;
  createdAt: Date;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  description: string;
  culture: string[];
  benefits: string[];
  openPositions: number;
}
