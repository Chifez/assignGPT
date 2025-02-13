'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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
import { ArrowLeft } from 'lucide-react';
import { QuizLoader } from '../chat/quiz-loader';
import { useUserStore } from '@/utils/store/userStore';
import { toast } from 'sonner';

export function QuizContent() {
  const { token } = useParams();
  const router = useRouter();

  const supabase = createClient();
  const user = useUserStore((state) => state.user);

  const [quiz, setQuiz] = useState<QuizData | undefined>(undefined);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: number]: string | string[];
  }>({});
  const [score, setScore] = useState<null | number>(null);

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

  const handlePrevious = () => {};
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }

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

  useEffect(() => {
    const fetchQuiz = async () => {
      if (token) {
        const { data, error } = await supabase
          .from('quizzes')
          .select('*')
          .eq('id', token)
          .single();

        if (error) {
          toast.error(`Oops an error occurred`);
          router.push('/');
          return;
        }
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
  }, [token]);

  if (!quiz) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <QuizLoader className="max-w-2xl max-h-72" />
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="relative py-4 mt-4">
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
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={
                Object.keys(userAnswers).length !== quiz.questions.length
              }
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
    </div>
  );
}
