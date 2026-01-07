-- Drop overly permissive policies
DROP POLICY "Users can create conversations" ON public.conversations;
DROP POLICY "Users can add participants" ON public.conversation_participants;

-- Create proper policies for conversations - users can only create if they're adding themselves
CREATE POLICY "Users can create conversations"
ON public.conversations FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Users can only add themselves as participants initially
CREATE POLICY "Users can add themselves as participants"
ON public.conversation_participants FOR INSERT
WITH CHECK (user_id = auth.uid());