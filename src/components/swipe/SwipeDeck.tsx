import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, RefreshCw, SlidersHorizontal } from 'lucide-react';
import { SwipeCard } from './SwipeCard';
import { MatchModal } from './MatchModal';
import { SwipeProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { mockProfiles } from '@/data/mockData';

export function SwipeDeck() {
  const [profiles, setProfiles] = useState<SwipeProfile[]>(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<SwipeProfile | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);

  const handleSwipeLeft = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSwipeRight = () => {
    // Simulate match (50% chance)
    const isMatch = Math.random() > 0.5;
    
    if (isMatch) {
      setMatchedProfile(profiles[currentIndex]);
      setShowMatchModal(true);
    }
    
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleViewProfile = () => {
    // TODO: Open full profile modal
    console.log('View profile:', profiles[currentIndex]);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  const remainingProfiles = profiles.slice(currentIndex, currentIndex + 3);
  const isOutOfProfiles = currentIndex >= profiles.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4">
      {/* Header */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Discover</h1>
          <p className="text-muted-foreground text-sm">
            {isOutOfProfiles ? "No more profiles" : `${profiles.length - currentIndex} profiles remaining`}
          </p>
        </div>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-md h-[580px]">
        {isOutOfProfiles ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">You've seen everyone!</h2>
            <p className="text-muted-foreground mb-6">
              Check back later for new profiles
            </p>
            <Button onClick={handleReset} variant="gradient">
              <RefreshCw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence>
            {remainingProfiles.map((profile, index) => (
              <SwipeCard
                key={profile.id}
                profile={profile}
                isTop={index === 0}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                onViewProfile={handleViewProfile}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Match Modal */}
      <MatchModal
        isOpen={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        profile={matchedProfile}
      />
    </div>
  );
}
