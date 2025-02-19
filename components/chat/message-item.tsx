import { LoadingCursor } from './loading-cursor';
import { ResponseActions } from './response-actions';
import { Quiz } from '../quiz';
import { QuizLoader } from './quiz-loader';
import { MessageItemProps } from '@/utils/types';
import { useEffect, useRef } from 'react';

export function MessageItem({
  message,
  isLastMessage,
  isLoading,
  onPreviewClick,
}: MessageItemProps) {
  const showLoadingCursor =
    isLastMessage && isLoading && message.role === 'assistant';
  const showActions =
    message.role === 'assistant' && (!isLastMessage || !isLoading);
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div className="whitespace-pre-wrap flex flex-col mb-5">
      <div
        className={`${
          message.role === 'user' ? 'bg-slate-200 ml-auto' : 'bg-transparent'
        } p-2 rounded-lg`}
      >
        <span>{message.content}</span>
        {showLoadingCursor && <LoadingCursor />}
      </div>

      <div>
        {message.toolInvocations?.map((toolInvocation) => {
          const { toolName, toolCallId, state } = toolInvocation;

          if (state === 'result' && toolName === 'generateQuiz') {
            return (
              <div key={toolCallId}>
                <Quiz
                  {...toolInvocation.result}
                  onPreviewClick={onPreviewClick}
                />
              </div>
            );
          }

          if (toolName === 'generateQuiz') {
            return (
              <div key={toolCallId}>
                <QuizLoader />
              </div>
            );
          }

          return null;
        })}
      </div>

      {showActions && (
        <ResponseActions content={message.content} messageId={message.id} />
      )}
      <div ref={messageRef} />
    </div>
  );
}
