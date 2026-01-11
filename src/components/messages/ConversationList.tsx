import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Conversation } from '@/hooks/useMessages';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          Messages
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation, index) => (
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
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={conversation.participant.avatar} />
                <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {conversation.unread && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={cn("font-medium truncate", conversation.unread && "text-foreground")}>
                  {conversation.participant.name}
                </span>
                {conversation.lastMessage && (
                  <span className="text-xs text-muted-foreground ml-2">
                    {formatTime(conversation.lastMessage.created_at)}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate mb-1">
                {conversation.participant.role}
              </p>
              <p className={cn(
                "text-sm truncate",
                conversation.unread ? "font-medium text-foreground" : "text-muted-foreground"
              )}>
                {conversation.lastMessage?.content || 'No messages yet'}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
