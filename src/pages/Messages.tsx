import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ConversationList } from '@/components/messages/ConversationList';
import { ChatView } from '@/components/messages/ChatView';
import { useConversations } from '@/hooks/useMessages';
import { cn } from '@/lib/utils';

export default function Messages() {
  const { conversations, loading } = useConversations();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] bg-background">
        <div className="container mx-auto h-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-full bg-card rounded-none md:rounded-xl md:m-4 md:h-[calc(100%-2rem)] shadow-lg overflow-hidden border border-border/50"
          >
            {/* Conversation List */}
            <div className={cn(
              "w-full md:w-80 border-r border-border flex-shrink-0",
              selectedConversationId && "hidden md:block"
            )}>
              <ConversationList
                conversations={conversations}
                selectedId={selectedConversationId || undefined}
                onSelect={setSelectedConversationId}
              />
            </div>

            {/* Chat View */}
            <div className={cn(
              "flex-1",
              !selectedConversationId && "hidden md:flex"
            )}>
              {selectedConversation ? (
                <ChatView
                  conversationId={selectedConversationId!}
                  conversation={selectedConversation}
                  onBack={() => setSelectedConversationId(null)}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-center p-6">
                  <div>
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                    <h3 className="font-semibold text-lg mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a conversation to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
