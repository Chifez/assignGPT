'use client';

import { Navigators } from '@/components/navigators';
import Chat from '../components/chat/chat';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { QuizPreview } from '@/components/quiz/quiz-preview';
import { useQuizPreview } from '@/hooks/use-quiz-preview';

export default function Home() {
  const { isOpen, quizId, closePreview } = useQuizPreview();

  return (
    <SidebarProvider>
      <AppSidebar />

      <main>
        <Navigators />
        <div className="relative flex flex-row h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
          <Chat />
          <div
            className={`border-l transition-transform duration-200 ${
              isOpen ? 'translate-x-0 w-[30%]' : 'translate-x-full w-0'
            }`}
          >
            <QuizPreview
              quizId={quizId!}
              isOpen={isOpen}
              onClose={closePreview}
            />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
