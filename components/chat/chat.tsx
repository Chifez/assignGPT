'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { toast } from 'sonner';
import { MessageItem } from './message-item';
import { FilePreview } from './file-preview';
import { ChatInput } from './chat-input';
import { LoadingCursor } from './loading-cursor';
import { QuizPreview } from '../quiz/quiz-preview';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: '/api/chat',
      onError: (error) => {
        console.error('Chat error:', error);
        toast.error(
          'Failed to generate quiz. Please make sure you are logged in.'
        );
      },
    });

  const [files, setFiles] = useState<File[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const lastMessage = messages[messages.length - 1];
  const isLastMessageAssistant = lastMessage?.role === 'assistant';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) {
      stop();
    } else {
      handleSubmit(e);
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
    setSelectedQuizId(quizId);
    setPreviewOpen(true);
  };

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
      <div className="flex-shrink-0 bg-gradient-to-t from-white via-white to-transparent pb-4 px-4 py-2">
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
