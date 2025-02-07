import { Message } from 'ai';

export interface Question {
  question: string;
  options: string[];
  answer: string;
  type: 'single' | 'multiple' | 'paragraph';
}

export interface QuizData {
  title: string;
  numQuestions: number;
  questions: Question[];
}

export interface QuizCardProps {
  quiz: {
    question: string;
    options: string[];
    type: 'single' | 'multiple' | 'paragraph';
  };
  index: number;
  handleSelectAnswer: (index: number, answer: string | string[]) => void;
  userAnswer: string | string[] | undefined;
}

export interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export interface MessageItemProps {
  message: Message;
  isLastMessage: boolean;
  isLoading: boolean;
  onPreviewClick: (quizId: string) => void;
}

export interface ResponseActionsProps {
  content: string;
  messageId: string;
}

export interface History {
  title: string;
  onclick: () => void;
}

export interface QuizProps {
  title: string;
  numQuestions: number;
  link: string;
  description?: string;
  token: string;
  onPreviewClick?: (quizId: string) => void;
}

export interface LoginFormProps {
  onSuccess?: () => void;
}
