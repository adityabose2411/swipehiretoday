import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { MapPin, Briefcase, Star, ChevronRight, X, Heart } from 'lucide-react';
import { SwipeProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SwipeCardProps {
  profile: SwipeProfile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onViewProfile: () => void;
  isTop?: boolean;
}

export function SwipeCard({ profile, onSwipeLeft, onSwipeRight, onViewProfile, isTop = false }: SwipeCardProps) {
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExitDirection('right');
      onSwipeRight();
    } else if (info.offset.x < -threshold) {
      setExitDirection('left');
      onSwipeLeft();
    }
  };

  const { user, matchScore } = profile;

  const getAvailabilityStyles = () => {
    switch (user.availability) {
      case 'available':
        return 'bg-success/20 text-success border-success/30';
      case 'open':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'busy':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div
      className={cn(
        "absolute w-full max-w-md swipe-card cursor-grab active:cursor-grabbing",
        isTop ? "z-10" : "z-0"
      )}
      style={{ x, rotate, opacity }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={
        exitDirection === 'right'
          ? { x: 500, rotate: 20, opacity: 0 }
          : exitDirection === 'left'
          ? { x: -500, rotate: -20, opacity: 0 }
          : {}
      }
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Card Content */}
      <div className="relative overflow-hidden rounded-3xl bg-card shadow-card">
        {/* Image Section */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Swipe Indicators */}
          <motion.div
            className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-success text-success-foreground font-bold text-lg rotate-12 border-4 border-success-foreground"
            style={{ opacity: likeOpacity }}
          >
            LIKE
          </motion.div>
          <motion.div
            className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground font-bold text-lg -rotate-12 border-4 border-destructive-foreground"
            style={{ opacity: nopeOpacity }}
          >
            NOPE
          </motion.div>

          {/* Match Score */}
          {matchScore && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              {matchScore}% Match
            </div>
          )}

          {/* Basic Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-white/90 font-medium">{user.title}</p>
            {user.company && (
              <div className="flex items-center gap-2 mt-2 text-white/80">
                <Briefcase className="w-4 h-4" />
                <span>{user.company}</span>
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-4">
          {/* Location & Availability */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{user.location}</span>
            </div>
            <Badge
              variant="outline"
              className={cn("capitalize", getAvailabilityStyles())}
            >
              {user.availability === 'not-looking' ? 'Not Looking' : user.availability}
            </Badge>
          </div>

          {/* Bio */}
          <p className="text-foreground/80 text-sm leading-relaxed line-clamp-2">
            {user.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {user.skills.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-accent text-accent-foreground">
                {skill}
              </Badge>
            ))}
            {user.skills.length > 4 && (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                +{user.skills.length - 4}
              </Badge>
            )}
          </div>

          {/* View Profile Button */}
          <Button
            variant="ghost"
            className="w-full justify-between text-primary hover:bg-primary/5"
            onClick={onViewProfile}
          >
            Know More
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons (visible on top card) */}
      {isTop && (
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="swipeLeft"
            size="iconXl"
            onClick={onSwipeLeft}
            className="shadow-lg hover:shadow-xl transition-all"
          >
            <X className="w-7 h-7" />
          </Button>
          <Button
            variant="swipeRight"
            size="iconXl"
            onClick={onSwipeRight}
            className="shadow-lg hover:shadow-xl transition-all"
          >
            <Heart className="w-7 h-7" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}
