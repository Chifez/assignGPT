import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { data } = router.query;

  const [quiz, setQuiz] = useState<QuizData | null>(null);

  useEffect(() => {
    if (typeof data === 'string') {
      try {
        const decodedData = JSON.parse(decodeURIComponent(data));
        setQuiz(decodedData);
      } catch (error) {
        console.error('Invalid quiz data:', error);
      }
    }
  }, [data]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      {quiz ? (
        <>
          <h1 className="text-3xl font-bold">{quiz.title}</h1>
          <p className="text-lg text-gray-600">
            Number of questions: {quiz.numQuestions}
          </p>
          <div className="mt-4 space-y-4">
            {quiz.questions.map((q, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{q.question}</h2>
                <ul className="mt-2">
                  {q.options.map((option, i) => (
                    <li key={i} className="text-gray-700">
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-red-500">Invalid or missing quiz data.</p>
      )}
    </main>
  );
}
