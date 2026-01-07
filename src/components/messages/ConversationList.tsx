import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Conversation } from '@/hooks/useMessages';
import { mockProfiles } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const { user } = useAuth();

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-2">No conversations yet</h3>
        <p className="text-sm text-muted-foreground">
          Start messaging your matches!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation, index) => {
          // Get the other participant
          const otherUserId = conversation.participants.find(p => p !== user?.id);
          const otherUser = mockProfiles.find(p => p.user.id === otherUserId)?.user;
          
          return (
            <motion.button
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(conversation.id)}
              className={cn(
                "w-full flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors text-left border-b border-border/50",
                selectedId === conversation.id && "bg-accent"
              )}
            >
              <Avatar className="w-12 h-12">
                <AvatarImage src={otherUser?.profileImage} />
                <AvatarFallback>{otherUser?.name?.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium truncate">{otherUser?.name || 'Unknown User'}</span>
                  {conversation.lastMessage && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(conversation.lastMessage.created_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage?.content || 'No messages yet'}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
