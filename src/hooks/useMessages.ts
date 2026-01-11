import { useState, useCallback } from 'react';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  read_at: string | null;
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  lastMessage?: Message;
  unread: boolean;
}

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: '1',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:20:00Z',
    participant: {
      id: 'user-1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'Senior Frontend Developer'
    },
    lastMessage: {
      id: 'm5',
      conversation_id: '1',
      sender_id: 'user-1',
      content: 'Looking forward to our interview!',
      created_at: '2024-01-15T10:20:00Z',
      read_at: null
    },
    unread: true
  },
  {
    id: '2',
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T09:10:00Z',
    participant: {
      id: 'user-2',
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'Product Manager'
    },
    lastMessage: {
      id: 'm3',
      conversation_id: '2',
      sender_id: 'user-2',
      content: 'Can we reschedule to Thursday?',
      created_at: '2024-01-15T09:10:00Z',
      read_at: '2024-01-15T09:15:00Z'
    },
    unread: false
  },
  {
    id: '3',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:15:00Z',
    participant: {
      id: 'user-3',
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      role: 'UX Designer'
    },
    lastMessage: {
      id: 'm4',
      conversation_id: '3',
      sender_id: 'user-3',
      content: 'Thanks for the feedback on my portfolio!',
      created_at: '2024-01-15T08:15:00Z',
      read_at: '2024-01-15T08:20:00Z'
    },
    unread: false
  },
  {
    id: '4',
    created_at: '2024-01-14T15:00:00Z',
    updated_at: '2024-01-14T16:00:00Z',
    participant: {
      id: 'user-4',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      role: 'Backend Engineer'
    },
    lastMessage: {
      id: 'm3',
      conversation_id: '4',
      sender_id: 'user-4',
      content: 'The technical assessment went well',
      created_at: '2024-01-14T16:00:00Z',
      read_at: '2024-01-14T16:30:00Z'
    },
    unread: false
  }
];

// Mock messages per conversation
const mockMessagesData: Record<string, Message[]> = {
  '1': [
    { id: 'm1', conversation_id: '1', sender_id: 'user-1', content: 'Hi! I saw your job posting for Frontend Developer', created_at: '2024-01-15T10:00:00Z', read_at: '2024-01-15T10:01:00Z' },
    { id: 'm2', conversation_id: '1', sender_id: 'me', content: "Hello Sarah! Yes, we're actively hiring. Your profile looks great!", created_at: '2024-01-15T10:05:00Z', read_at: '2024-01-15T10:06:00Z' },
    { id: 'm3', conversation_id: '1', sender_id: 'user-1', content: 'Thank you! I have 5 years of React experience', created_at: '2024-01-15T10:10:00Z', read_at: '2024-01-15T10:11:00Z' },
    { id: 'm4', conversation_id: '1', sender_id: 'me', content: "That's perfect. Would you be available for an interview this week?", created_at: '2024-01-15T10:15:00Z', read_at: '2024-01-15T10:16:00Z' },
    { id: 'm5', conversation_id: '1', sender_id: 'user-1', content: 'Looking forward to our interview!', created_at: '2024-01-15T10:20:00Z', read_at: null },
  ],
  '2': [
    { id: 'm1', conversation_id: '2', sender_id: 'user-2', content: 'Hello! About our scheduled meeting...', created_at: '2024-01-15T09:00:00Z', read_at: '2024-01-15T09:01:00Z' },
    { id: 'm2', conversation_id: '2', sender_id: 'me', content: "Hi Marcus! What's up?", created_at: '2024-01-15T09:05:00Z', read_at: '2024-01-15T09:06:00Z' },
    { id: 'm3', conversation_id: '2', sender_id: 'user-2', content: 'Can we reschedule to Thursday?', created_at: '2024-01-15T09:10:00Z', read_at: '2024-01-15T09:15:00Z' },
  ],
  '3': [
    { id: 'm1', conversation_id: '3', sender_id: 'me', content: 'Hi Emily! I reviewed your portfolio', created_at: '2024-01-15T08:00:00Z', read_at: '2024-01-15T08:01:00Z' },
    { id: 'm2', conversation_id: '3', sender_id: 'user-3', content: 'Oh great! What did you think?', created_at: '2024-01-15T08:05:00Z', read_at: '2024-01-15T08:06:00Z' },
    { id: 'm3', conversation_id: '3', sender_id: 'me', content: 'Really impressive work on the mobile app redesign!', created_at: '2024-01-15T08:10:00Z', read_at: '2024-01-15T08:11:00Z' },
    { id: 'm4', conversation_id: '3', sender_id: 'user-3', content: 'Thanks for the feedback on my portfolio!', created_at: '2024-01-15T08:15:00Z', read_at: '2024-01-15T08:20:00Z' },
  ],
  '4': [
    { id: 'm1', conversation_id: '4', sender_id: 'user-4', content: 'Just finished the coding challenge', created_at: '2024-01-14T15:00:00Z', read_at: '2024-01-14T15:05:00Z' },
    { id: 'm2', conversation_id: '4', sender_id: 'me', content: 'Great! Our team will review it shortly', created_at: '2024-01-14T15:30:00Z', read_at: '2024-01-14T15:35:00Z' },
    { id: 'm3', conversation_id: '4', sender_id: 'user-4', content: 'The technical assessment went well', created_at: '2024-01-14T16:00:00Z', read_at: '2024-01-14T16:30:00Z' },
  ],
};

export function useConversations() {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [loading] = useState(false);

  const createConversation = useCallback((otherUserId: string) => {
    // Mock creating a conversation - just return the first conversation ID
    return { data: { id: '1' }, error: null };
  }, []);

  return { conversations, loading, createConversation };
}

export function useMessages(conversationId?: string) {
  const [messages, setMessages] = useState<Message[]>(
    conversationId ? mockMessagesData[conversationId] || [] : []
  );
  const [loading] = useState(false);

  const sendMessage = useCallback((content: string) => {
    if (!conversationId) return { error: new Error('No conversation selected') };
    
    const newMessage: Message = {
      id: `m${Date.now()}`,
      conversation_id: conversationId,
      sender_id: 'me',
      content,
      created_at: new Date().toISOString(),
      read_at: null,
    };
    setMessages(prev => [...prev, newMessage]);
    return { data: newMessage, error: null };
  }, [conversationId]);

  return { messages, loading, sendMessage };
}
