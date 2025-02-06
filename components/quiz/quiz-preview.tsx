'use client';

import { useState, useEffect } from 'react';
import { QuizCard } from '../cards/quizcard';
import { Dialog, DialogContent } from '../ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface QuizPreviewProps {
  quizId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function QuizPreview({ quizId, isOpen, onClose }: QuizPreviewProps) {
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen && quizId) {
      fetchQuiz();
    }
  }, [isOpen, quizId]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/quiz/${quizId}`);
      const data = await response.json();
      setQuiz(data);
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-full sm:max-w-[425px]">
          <ScrollArea className="h-[80vh]">
            {loading ? (
              <div className="space-y-4 p-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : (
              //   quiz && (
              //     <QuizCard
              //       quiz={quiz}

              //     />
              //   )
              <p>coming soon</p>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="h-full relative border border-green-500">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      <ScrollArea className="h-full">
        {loading ? (
          <div className="space-y-4 p-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-20 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : (
          //   quiz && (
          //     <QuizCard
          //       quiz={quiz}
          //       isPreview
          //       className="border-none shadow-none"
          //     />
          //   )
          <p>coming soon</p>
        )}
      </ScrollArea>
    </div>
  );
}
