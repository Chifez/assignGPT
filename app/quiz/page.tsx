'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
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
const Quiz = {
  title: 'JavaScript Fundamentals Quiz',
  numQuestions: 10,
  questions: [
    {
      question:
        "What is the correct syntax for referring to an external script called 'script.js'?",
      options: [
        "<script src='script.js'>",
        "<script href='script.js'>",
        "<script ref='script.js'>",
        "<script name='script.js'>",
      ],
      answer: "<script src='script.js'>",
    },
    {
      question: 'How do you declare a JavaScript variable?',
      options: ['var myVar;', 'variable myVar;', 'v myVar;', 'let: myVar;'],
      answer: 'var myVar;',
    },
    {
      question: 'Which of the following is NOT a JavaScript data type?',
      options: ['String', 'Boolean', 'Float', 'Undefined'],
      answer: 'Float',
    },
    {
      question: 'What will `console.log(typeof [])` output?',
      options: ["'array'", "'object'", "'null'", "'undefined'"],
      answer: "'object'",
    },
    {
      question:
        'Which keyword is used to define a constant variable in JavaScript?',
      options: ['let', 'var', 'const', 'static'],
      answer: 'const',
    },
    {
      question: 'What does the `===` operator do in JavaScript?',
      options: [
        'Checks both value and type',
        'Checks value only',
        'Assigns a value',
        'Compares only types',
      ],
      answer: 'Checks both value and type',
    },
    {
      question:
        'Which of the following is a correct way to write an arrow function?',
      options: [
        'function myFunc() => {}',
        'const myFunc = () => {}',
        'arrow myFunc = () {}',
        'let myFunc() => {}',
      ],
      answer: 'const myFunc = () => {}',
    },
    {
      question: 'What is the output of `console.log(0.1 + 0.2 === 0.3)`?',
      options: ['true', 'false', 'undefined', 'TypeError'],
      answer: 'false',
    },
    {
      question: 'How can you convert a string into an integer in JavaScript?',
      options: [
        'Number.parseInt()',
        'toInteger()',
        'parseInt()',
        "Both 'Number.parseInt()' and 'parseInt()'",
      ],
      answer: "Both 'Number.parseInt()' and 'parseInt()'",
    },
    {
      question:
        'Which method is used to add a new element to the end of an array?',
      options: ['push()', 'append()', 'add()', 'insert()'],
      answer: 'push()',
    },
  ],
};

export default function QuizPage() {
  // const searchParams = useSearchParams();
  // const token = searchParams.get('token');

  const [quiz, setQuiz] = useState<QuizData | null>(Quiz);
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

  // useEffect(() => {
  //   if (token) {
  //     const fetchedQuiz = localStorage.getItem(token);

  //     if (fetchedQuiz) setQuiz(JSON.parse(fetchedQuiz));
  //   }
  // }, [token]);

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
