import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { MeetupVenueType } from '@/types';
import { toast } from 'sonner';

interface ScheduleMeetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileName: string;
  profileId: string;
}

export function ScheduleMeetupDialog({ 
  open, 
  onOpenChange, 
  profileName,
  profileId 
}: ScheduleMeetupDialogProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [venueType, setVenueType] = useState<MeetupVenueType | ''>('');
  const [venueName, setVenueName] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!date || !time || !venueType) {
      toast.error('Please fill in all required fields');
      return;
    }

    // TODO: Save to database when meetups table is created
    toast.success(`Meetup request sent to ${profileName}!`);
    
    // Reset form
    setDate(undefined);
    setTime('');
    setVenueType('');
    setVenueName('');
    setNotes('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Schedule Meetup with {profileName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Time *</Label>
              <Input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Venue Type *</Label>
            <Select value={venueType} onValueChange={(v) => setVenueType(v as MeetupVenueType)}>
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
            <Input 
              placeholder="e.g., Blue Tokai Coffee, CyberHub" 
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Notes / Agenda</Label>
            <Textarea 
              placeholder="What would you like to discuss?" 
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="gradient" className="flex-1" onClick={handleSubmit}>
              Send Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}