'use client';

import { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { toast } from 'sonner';
import { MessageItem } from './message-item';
import { FilePreview } from './file-preview';
import { ChatInput } from './chat-input';
import { LoadingCursor } from './loading-cursor';
import { useIsMobile } from '@/hooks/use-mobile';
import { useChatStore } from '@/utils/store/chatStore';
import { Message } from 'ai';
import { nanoid } from 'nanoid';
import AboutCard from '../cards/aboutcard';

export default function Chat() {
  const {
    currentChatId,
    setCurrentChatId,
    createChat,
    saveMessage,
    fetchMessages,
  } = useChatStore();

  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setMessages,
  } = useChat({
    api: '/api/chat',
    initialMessages,
    onFinish: async (message) => {
      if (currentChatId) {
        console.log('ui messages', messages, message);
        await saveMessage(currentChatId, message);
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
      toast.error('Failed to send message. Please try again.');
    },
    sendExtraMessageFields: true,
  });

  const lastMessage = messages[messages.length - 1];
  const isLastMessageAssistant = lastMessage?.role === 'assistant';

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) {
      stop();
    } else {
      handleSubmit(e);
      const userMessage: Message = {
        id: nanoid(),
        role: 'user',
        content: input,
      };

      // Save user message immediately
      if (currentChatId) {
        await saveMessage(currentChatId, userMessage);
      }
      // If new chat, create it first and generate a chatId
      if (!currentChatId) {
        const chatId = await createChat(input, messages);
        setCurrentChatId(chatId);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleFileRemove = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handlePreviewClick = (quizId: string) => {
    // TODO implement preview quiz
    // setSelectedQuizId(quizId);
    // setPreviewOpen(true);
  };

  // Load messages when chat changes
  useEffect(() => {
    console.log('trigger', { currentChatId, isLoading });
    async function loadMessages() {
      if (currentChatId) {
        try {
          const fetchedMessages = await fetchMessages(currentChatId);
          if (fetchedMessages.length > 0) {
            setMessages(fetchedMessages); // Only overwrite if there are messages
          }
        } catch (error) {
          toast.error('Failed to load chat messages');
        }
      } else {
        setMessages([]); // Clear messages for new chat
        // setInitialMessages([]);
      }
    }

    loadMessages();
  }, [currentChatId]);

  return (
    <div className="flex h-full w-full flex-col">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
          {messages.map((message, index) => (
            <MessageItem
              key={message.id}
              message={message}
              isLastMessage={index === messages.length - 1}
              isLoading={isLoading}
              onPreviewClick={handlePreviewClick}
            />
          ))}

          {isLoading && !isLastMessageAssistant && (
            <div className="whitespace-pre-wrap flex flex-col">
              <div className="bg-transparent p-2 rounded-lg">
                <LoadingCursor />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input container */}
      <div className="sticky bottom-0 z-40 flex-shrink-0 bg-gradient-to-t from-white via-white to-transparent pb-4 px-4 py-2">
        {!currentChatId && <AboutCard />}
        <div className="max-w-xl mx-auto">
          <FilePreview files={files} onRemove={handleFileRemove} />
          <ChatInput
            input={input}
            isLoading={isLoading}
            onSubmit={handleFormSubmit}
            onChange={handleInputChange}
            onFileSelect={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
