import { Message } from 'ai';
import { Quiz } from '../quiz';
import { QuizLoader } from './quiz-loader';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import { QuizPreview } from '../quiz/quiz-preview';

interface QuizResultProps {
  toolInvocations?: Message['toolInvocations'];
}

export function QuizResult({ toolInvocations }: QuizResultProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  if (!toolInvocations?.length) return null;

  return (
    <div>
      {toolInvocations.map((toolInvocation) => {
        const { toolName, toolCallId, state } = toolInvocation;

        if (state === 'result' && toolName === 'generateQuiz') {
          const quizId = toolInvocation.result.token;
          return (
            <div key={toolCallId} className="relative">
              <Quiz
                {...toolInvocation.result}
                token={quizId}
                onPreviewClick={setPreviewOpen}
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
  );
}
