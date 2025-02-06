'use client';

import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface QuizCardProps {
  quiz: {
    question: string;
    options: string[];
    type: 'single' | 'multiple' | 'paragraph';
  };
  index: number;
  handleSelectAnswer: (index: number, answer: string | string[]) => void;
  userAnswer: string | string[] | undefined;
}

export const QuizCard = ({
  quiz,
  index,
  handleSelectAnswer,
  userAnswer,
}: QuizCardProps) => {
  const [localAnswer, setLocalAnswer] = useState<string | string[]>(
    userAnswer || (quiz.type === 'multiple' ? [] : '')
  );

  useEffect(() => {
    setLocalAnswer(userAnswer || (quiz.type === 'multiple' ? [] : ''));
  }, [userAnswer, quiz.type]);

  const handleChange = (value: string | string[]) => {
    setLocalAnswer(value);
    handleSelectAnswer(index, value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{quiz.question}</h3>
      {quiz.type === 'single' && (
        <RadioGroup
          value={localAnswer as string}
          onValueChange={(value) => handleChange(value)}
        >
          {quiz.options.map((option, i) => (
            <div key={i} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}-${i}`} />
              <Label htmlFor={`option-${index}-${i}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
      {quiz.type === 'multiple' && (
        <div className="space-y-2">
          {quiz.options.map((option, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Checkbox
                id={`option-${index}-${i}`}
                checked={(localAnswer as string[]).includes(option)}
                onCheckedChange={(checked) => {
                  const newAnswer = checked
                    ? [...(localAnswer as string[]), option]
                    : (localAnswer as string[]).filter(
                        (item) => item !== option
                      );
                  handleChange(newAnswer);
                }}
              />
              <Label htmlFor={`option-${index}-${i}`}>{option}</Label>
            </div>
          ))}
        </div>
      )}
      {quiz.type === 'paragraph' && (
        <Textarea
          value={localAnswer as string}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full"
        />
      )}
    </div>
  );
};
