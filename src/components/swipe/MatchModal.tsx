import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Calendar, X } from 'lucide-react';
import { SwipeProfile } from '@/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { currentUser } from '@/data/mockData';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: SwipeProfile | null;
}

export function MatchModal({ isOpen, onClose, profile }: MatchModalProps) {
  if (!profile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-sm bg-card rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Gradient Header */}
            <div className="relative h-48 gradient-match overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="relative"
                >
                  {/* Heart Icon */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                  >
                    <Heart className="w-12 h-12 text-white fill-white drop-shadow-lg" />
                  </motion.div>
                  
                  {/* Avatars */}
                  <div className="flex items-center -space-x-4 mt-4">
                    <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg">
                      <AvatarImage src={currentUser.profileImage} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Avatar className="w-20 h-20 ring-4 ring-white shadow-lg">
                      <AvatarImage src={profile.user.profileImage} />
                      <AvatarFallback>{profile.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </motion.div>
              </div>
              
              {/* Confetti-like particles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute inset-0"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/40"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  It's a Match! 🎉
                </h2>
                <p className="text-muted-foreground mb-6">
                  You and <span className="font-semibold text-foreground">{profile.user.name}</span> liked each other
                </p>

                <div className="flex flex-col gap-3">
                  <Button variant="gradient" className="w-full" size="lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Meetup
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Keep Swiping
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
