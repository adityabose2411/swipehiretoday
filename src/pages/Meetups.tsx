import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Plus, Coffee, Building2, Monitor, Users } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockMeetups, mockProfiles } from '@/data/mockData';
import { MeetupStatus, MeetupVenueType } from '@/types';
import { cn } from '@/lib/utils';

const venueIcons: Record<MeetupVenueType, any> = {
  'corporate-office': Building2,
  'boardroom': Users,
  'cafe': Coffee,
  'tech-hub': Monitor,
  'virtual': Monitor,
};

const statusStyles: Record<MeetupStatus, string> = {
  pending: 'bg-match/20 text-match border-match/30',
  accepted: 'bg-success/20 text-success border-success/30',
  completed: 'bg-muted text-muted-foreground border-muted',
  cancelled: 'bg-destructive/20 text-destructive border-destructive/30',
};

export default function Meetups() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');

  const meetupsWithProfiles = mockMeetups.map(meetup => {
    const profile = mockProfiles.find(p => p.user.id === meetup.scheduledWith);
    return { meetup, profile: profile?.user };
  });

  const upcomingMeetups = meetupsWithProfiles.filter(
    m => m.meetup.status === 'pending' || m.meetup.status === 'accepted'
  );
  const pastMeetups = meetupsWithProfiles.filter(
    m => m.meetup.status === 'completed' || m.meetup.status === 'cancelled'
  );

  const displayMeetups = selectedTab === 'upcoming' ? upcomingMeetups : pastMeetups;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Meetups</h1>
              <p className="text-muted-foreground">
                Schedule real-world connections
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gradient">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Meetup
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Schedule a Meetup</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Venue Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select venue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate-office">Corporate Office</SelectItem>
                        <SelectItem value="boardroom">Boardroom / Meeting Room</SelectItem>
                        <SelectItem value="cafe">Café / Restaurant</SelectItem>
                        <SelectItem value="tech-hub">Tech Hub (CyberHub style)</SelectItem>
                        <SelectItem value="virtual">Virtual Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Venue Name</Label>
                    <Input placeholder="e.g., Blue Tokai Coffee, CyberHub" />
                  </div>
                  <div className="space-y-2">
                    <Label>Notes / Agenda</Label>
                    <Textarea placeholder="What would you like to discuss?" rows={3} />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="gradient" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                      Send Request
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 mb-6"
          >
            <Button
              variant={selectedTab === 'upcoming' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('upcoming')}
              className="rounded-full"
            >
              Upcoming ({upcomingMeetups.length})
            </Button>
            <Button
              variant={selectedTab === 'past' ? 'default' : 'ghost'}
              onClick={() => setSelectedTab('past')}
              className="rounded-full"
            >
              Past ({pastMeetups.length})
            </Button>
          </motion.div>

          {/* Meetups List */}
          <div className="space-y-4">
            {displayMeetups.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No meetups {selectedTab}</h3>
                <p className="text-muted-foreground mb-6">
                  Schedule your first meetup with a match!
                </p>
                <Button variant="gradient" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Meetup
                </Button>
              </motion.div>
            ) : (
              displayMeetups.map(({ meetup, profile }, index) => {
                const VenueIcon = venueIcons[meetup.venueType] || Coffee;
                
                return (
                  <motion.div
                    key={meetup.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-5 shadow-card hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={profile?.profileImage} />
                        <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{profile?.name}</h3>
                          <Badge
                            variant="outline"
                            className={cn("capitalize text-xs", statusStyles[meetup.status])}
                          >
                            {meetup.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{profile?.title}</p>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(meetup.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{meetup.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                            <VenueIcon className="w-4 h-4" />
                            <span>{meetup.venueName}</span>
                          </div>
                        </div>

                        {/* Notes */}
                        {meetup.notes && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <p className="text-sm text-muted-foreground">{meetup.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {meetup.status === 'pending' && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                        <Button variant="outline" size="sm" className="flex-1">
                          Reschedule
                        </Button>
                        <Button variant="swipeRight" size="sm" className="flex-1">
                          Accept
                        </Button>
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
