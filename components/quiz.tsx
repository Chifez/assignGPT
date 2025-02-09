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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Quiz({
  title,
  numQuestions,
  link,
  description,
  token,
  onPreviewClick,
}: QuizProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleQuizStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(link);
  };

  return (
    <Card className="relative w-full max-w-sm bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 mb-1">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10"
        onClick={() => onPreviewClick?.(token)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <Badge variant="secondary" className="w-fit">
          {numQuestions} {numQuestions === 1 ? 'Question' : 'Questions'}
        </Badge>
      </CardHeader>
      <CardContent>
        {description && <p className="text-muted-foreground">{description}</p>}
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <ClipboardList className="mr-2 h-4 w-4" />
          <span>Test your knowledge</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleQuizStart}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            <>
              Start Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
