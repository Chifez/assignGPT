import { Suspense } from 'react';
import { QuizContent } from '@/components/quiz/quiz-content';

export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading quiz...</div>}>
      <QuizContent />
    </Suspense>
  );
}
