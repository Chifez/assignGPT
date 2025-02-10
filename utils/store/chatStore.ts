import { create } from 'zustand';
import { Message, ToolInvocation } from 'ai';
import { createClient } from '../supabase/client';
import { ChatMessage, ChatState } from '../types';
import { toast } from 'sonner';

// Helper function to normalize a message
const normalizeMessage = (
  message: Message | any,
  toolName?: string,
  toolResult?: any,
  toolInvocations?: ToolInvocation[]
): ChatMessage => {
  // If message is a plain message object
  if (message.id && message.role && message.content) {
    return {
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt || new Date().toISOString(),
      tool_name: toolName || message.tool_name,
      tool_result: toolResult || message.tool_result,
      toolInvocations: toolInvocations || message.toolInvocations,
    };
  }

  // If message is already a normalized message
  if (message.tool_name || message.tool_result || message.toolInvocations) {
    return message;
  }

  throw new Error('Invalid message format');
};

export const useChatStore = create<ChatState>((set, get) => ({
  currentChatId: null,
  setCurrentChatId: (id) => set({ currentChatId: id }),
  chats: [],
  setChats: (chats) => set({ chats }),
  clearChats: () => {
    set({
      chats: [],
      currentChatId: null,
    });
  },

  fetchChats: async () => {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return;
    }

    const { data, error } = await supabase
      .from('chats')
      .select('id, title, messages')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching chats:', error);
      return;
    }

    set({ chats: data });
  },

  createChat: async (title: string, firstMessage: Message[]) => {
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error('Authentication error');
    }

    const normalizedMessage = firstMessage;

    const { data: chat, error: chatError } = await supabase
      .from('chats')
      .insert({
        title,
        user_id: user.id,
        messages: normalizedMessage,
      })
      .select()
      .single();

    if (chatError || !chat) {
      toast.error('Oops an error occurred');
      throw chatError;
    }

    get().fetchChats();
    return chat.id;
  },

  saveMessage: async (
    chatId: string,
    message: Message | Message[],
    toolName?: string,
    toolResult?: any,
    toolInvocations?: ToolInvocation[]
  ) => {
    const supabase = createClient();

    // First get current messages
    const { data: chat, error: fetchError } = await supabase
      .from('chats')
      .select('messages')
      .eq('id', chatId)
      .single();

    if (fetchError) {
      toast.error('Oops an error occurred');
      throw fetchError;
    }

    let existingMessages = Array.isArray(chat.messages) ? chat.messages : [];
    let messagesToAdd: ChatMessage[] = [];

    try {
      if (Array.isArray(message)) {
        // Handle array of messages
        messagesToAdd = message.map((msg) =>
          normalizeMessage(msg, toolName, toolResult, toolInvocations)
        );
      } else {
        // Handle single message
        messagesToAdd = [
          normalizeMessage(message, toolName, toolResult, toolInvocations),
        ];
      }
    } catch (error) {
      console.error('Error normalizing messages:', error);
      toast.error(`Oops an error occurred, ${error}`);
      throw error;
    }

    const updatedMessages = [...existingMessages, ...messagesToAdd];

    // Update chat with new messages
    const { error: updateError } = await supabase
      .from('chats')
      .update({
        messages: updatedMessages,
        updated_at: new Date().toISOString(),
      })
      .eq('id', chatId);

    if (updateError) {
      console.error('Error updating messages:', updateError);
      toast.error(`Oops an error occurred, ${updateError}`);
      throw updateError;
    }

    // Handle quiz updates if needed
    if (toolName === 'generateQuiz' && toolResult?.id) {
      const { error: quizError } = await supabase
        .from('quizzes')
        .update({ chat_id: chatId })
        .eq('id', toolResult.id);

      if (quizError) {
        console.error('Error linking quiz to chat:', quizError);
      }
    }
  },

  fetchMessages: async (chatId: string): Promise<ChatMessage[]> => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('chats')
      .select('messages')
      .eq('id', chatId)
      .single();

    if (error) {
      toast.error(`Oops an error occurred, ${error}`);
      throw error;
    }

    return Array.isArray(data.messages) ? data.messages : [];
  },
}));
