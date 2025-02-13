'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardList, Eye, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { QuizProps } from '@/utils/types';
import { useState } from 'react';
import Link from 'next/link';

import { QuizCard } from './cards/quizcard';
import { QuizCarousel } from './quiz/quiz-carousel';

export function Quiz({ title, numQuestions, questions, link }: QuizProps) {
  console.log('question frontend', title, numQuestions, questions);
  return (
    <Card className="relative w-full max-w-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 mb-1">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <Badge variant="secondary" className="w-fit">
          {numQuestions} {numQuestions === 1 ? 'Question' : 'Questions'}
        </Badge>
      </CardHeader>
      <CardContent className="max-w-full">
        <QuizCarousel questions={questions} numQuestions={numQuestions} />
      </CardContent>
      <CardFooter>
        <Link href={link} target="_blank">
          <Button className="w-full">
            Launch Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
