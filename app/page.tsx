'use client';

import Chat from '../components/chat/chat';
export default function Home() {
  return (
    <div className="flex flex-row h-[calc(100vh_-_theme(spacing.16))]">
      <Chat />
      {/* <div
            className={`border-l transition-transform duration-200 ${
              isOpen ? 'translate-x-0 w-[30%]' : 'translate-x-full w-0'
            }`}
          >
            <QuizPreview
              quizId={quizId!}
              isOpen={isOpen}
              onClose={closePreview}
            />
          </div> */}
    </div>
  );
}
