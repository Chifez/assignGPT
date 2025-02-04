'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getQuizById } from '../ai/tools';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizData {
  title: string;
  numQuestions: number;
  questions: Question[];
}

export default function QuizPage() {
  // const router = useRouter();
  // const { data } = router.query;
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<null | number>(null);

  const handleSelectAnswer = (
    questionIndex: number,
    selectedOption: string
  ) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const handleSubmit = () => {
    let currentScore = 0;
    quiz?.questions.forEach((item, index) => {
      userAnswers[index] === item.answer;
      currentScore++;
    });
    setScore(currentScore);
  };

  useEffect(() => {
    if (token) {
      const fetchedQuiz = localStorage.getItem(token);

      if (fetchedQuiz) setQuiz(JSON.parse(fetchedQuiz));
    }
  }, [token]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      {quiz ? (
        <>
          <div className="flex items-start justify-between">
            <span>
              <h1 className="text-3xl font-bold">{quiz.title}</h1>
              <p className="text-lg text-gray-600">
                Number of questions: {quiz.numQuestions}
              </p>
            </span>
            {score !== null && <span>{score}</span>}
          </div>
          <div className="mt-4 space-y-4">
            {quiz.questions.map((q, index) => (
              <Card key={index} className="p-4 bg-slate-50">
                <h2 className="text-xl font-semibold">{q.question}</h2>
                <ul className="mt-2">
                  {q.options.map((option, i) => (
                    <li
                      key={i}
                      className="text-gray-700"
                      onClick={() => handleSelectAnswer(index, option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <Button
            disabled={Object(userAnswers).length !== quiz.questions.length}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </>
      ) : (
        <p className="text-red-500">Invalid or missing quiz data.</p>
      )}
    </main>
  );
}
