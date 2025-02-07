'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { QuizCard } from '@/components/cards/quizcard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QuizData } from '@/utils/types';

export function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const supabase = createClient();

  const [quiz, setQuiz] = useState<QuizData | undefined>(undefined);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | string[];
  }>({});
  const [score, setScore] = useState<null | number>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (token) {
        const { data, error } = await supabase
          .from('quizzes')
          .select('*')
          .eq('id', token)
          .single();

        if (data && !error) {
          setQuiz({
            title: data.title,
            numQuestions: data.num_questions,
            questions: data.questions,
          });
        }
      }
    };

    fetchQuiz();
  }, [token, supabase]);

  const handleSelectAnswer = (
    questionIndex: number,
    selectedOption: string | string[]
  ) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goBack = () => {
    router.back();
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let currentScore = 0;
    quiz.questions.forEach((item, index) => {
      const userAnswer = userAnswers[index];
      if (Array.isArray(userAnswer)) {
        if (
          JSON.stringify(userAnswer.sort()) ===
          JSON.stringify(item.answer.split(',').sort())
        ) {
          currentScore++;
        }
      } else if (userAnswer === item.answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  if (!quiz) {
    return <p className="text-red-500">Invalid or missing quiz data.</p>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {quiz.numQuestions}
        </p>
      </CardHeader>
      <CardContent>
        <QuizCard
          quiz={currentQuestion}
          index={currentQuestionIndex}
          handleSelectAnswer={handleSelectAnswer}
          userAnswer={userAnswers[currentQuestionIndex]}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>
        {currentQuestionIndex === quiz.questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length !== quiz.questions.length}
          >
            Submit
          </Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </CardFooter>
      {score !== null && (
        <div className="text-center p-4 bg-green-100 rounded-b-lg">
          <p className="text-2xl font-bold">
            Your Score: {score} / {quiz.numQuestions}
          </p>
        </div>
      )}
    </Card>
  );
}
