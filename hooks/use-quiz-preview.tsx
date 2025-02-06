'use client';

import { createContext, useContext, useState } from 'react';

interface QuizPreviewContextType {
  isOpen: boolean;
  quizId: string | null;
  openPreview: (id: string) => void;
  closePreview: () => void;
}

const QuizPreviewContext = createContext<QuizPreviewContextType | undefined>(
  undefined
);

export function QuizPreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);

  const openPreview = (id: string) => {
    setQuizId(id);
    setIsOpen(true);
  };

  const closePreview = () => {
    setIsOpen(false);
    setQuizId(null);
  };

  return (
    <QuizPreviewContext.Provider
      value={{ isOpen, quizId, openPreview, closePreview }}
    >
      {children}
    </QuizPreviewContext.Provider>
  );
}

export function useQuizPreview() {
  const context = useContext(QuizPreviewContext);
  if (context === undefined) {
    throw new Error('useQuizPreview must be used within a QuizPreviewProvider');
  }
  return context;
}
