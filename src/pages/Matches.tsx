import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Search, MoreHorizontal } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockMatches, mockProfiles } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Matches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  // Get matched profiles with their user data
  const matchedProfiles = mockMatches.map(match => {
    const profile = mockProfiles.find(p => p.user.id === match.userId2);
    return {
      match,
      profile: profile?.user
    };
  }).filter(m => m.profile);

  const filteredMatches = matchedProfiles.filter(m => 
    m.profile?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.profile?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Matches</h1>
            <p className="text-muted-foreground">
              {matchedProfiles.length} mutual connections waiting for you
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-6"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl bg-card border-border"
            />
          </motion.div>

          {/* Matches List */}
          <div className="space-y-4">
            {filteredMatches.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No matches yet</h3>
                <p className="text-muted-foreground">
                  Keep swiping to find your perfect match!
                </p>
              </motion.div>
            ) : (
              filteredMatches.map(({ match, profile }, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "bg-card rounded-2xl p-4 shadow-card hover:shadow-lg transition-all cursor-pointer",
                    selectedMatch === match.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedMatch(match.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar className="w-16 h-16 ring-2 ring-success/30">
                        <AvatarImage src={profile?.profileImage} />
                        <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
                        <span className="text-[10px] text-success-foreground">✓</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{profile?.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {profile?.role === 'hr' ? 'HR' : 'Candidate'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{profile?.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Matched {new Date(match.matchedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-primary">
                        <MessageCircle className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-success">
                        <Calendar className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Skills Preview */}
                  {profile?.skills && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                      {profile.skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs bg-accent">
                          {skill}
                        </Badge>
                      ))}
                      {profile.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-muted">
                          +{profile.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
