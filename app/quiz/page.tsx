'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [quiz, setQuiz] = useState<QuizData | undefined>(undefined);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<null | number>(null);

  const handleSelectAnswer = (
    questionIndex: number,
    selectedOption: string
  ) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let currentScore = 0;
    quiz.questions.forEach((item, index) => {
      if (userAnswers[index] === item.answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  // useEffect(() => {
  //   if (token) {
  //     // Try to get quiz from Zustand first
  //     let fetchedQuiz = getQuizById(token);

  //     // If not in Zustand, try to get from server
  //     if (!fetchedQuiz) {
  //       fetchedQuiz = getServerQuiz(token);
  //     }

  //     if (fetchedQuiz) {
  //       setQuiz(fetchedQuiz);
  //     }
  //   }
  // }, [token, getQuizById]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      {quiz ? (
        <>
          <div>
            <span>
              <h1 className="text-3xl font-bold">{quiz.title}</h1>
              <p className="text-lg text-gray-600">
                Number of questions: {quiz.numQuestions}
              </p>
            </span>
            {score !== null && (
              <span className="flex text-center items-center justify-center text-2xl">
                Score: <pre>{score}</pre>
              </span>
            )}
          </div>
          <div className="mt-4 space-y-4">
            {quiz.questions.map((q, index) => (
              <Card key={index} className="p-4 bg-slate-50 text-start">
                <h2 className="text-xl font-semibold">{q.question}</h2>
                <form className="text-start mt-2">
                  {q.options.map((option, i) => (
                    <label key={i} htmlFor={q.question} className="flex">
                      <input
                        name={q.question}
                        type="radio"
                        className="text-gray-700"
                        onClick={() => handleSelectAnswer(index, option)}
                      />
                      {option}
                    </label>
                  ))}
                </form>
              </Card>
            ))}
          </div>
          <Button
            disabled={
              Object.entries(userAnswers).length != quiz.questions.length
            }
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
