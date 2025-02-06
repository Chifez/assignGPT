'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Eye } from 'lucide-react';

interface QuizCardProps {
  quiz: any;
  index?: number;
  handleSelectAnswer?: (index: number, answer: string) => void;
  isPreview?: boolean;
  className?: string;
}

export function QuizCard({
  quiz,
  index,
  handleSelectAnswer,
  isPreview,
  className,
}: QuizCardProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {index !== undefined ? `Question ${index + 1}` : quiz.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quiz.question && <p className="text-gray-700">{quiz.question}</p>}
          <RadioGroup
            disabled={isPreview}
            onValueChange={(value) =>
              handleSelectAnswer && handleSelectAnswer(index!, value)
            }
          >
            {quiz.options?.map((option: string, i: number) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option}
                  id={`option-${index}-${i}`}
                  disabled={isPreview}
                />
                <Label
                  htmlFor={`option-${index}-${i}`}
                  className={cn(
                    'text-sm font-normal',
                    isPreview && 'text-gray-500'
                  )}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
