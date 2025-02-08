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

// Store types
export interface ToolResult {
  link?: string;
  title?: string;
  numQuestions?: number;
  [key: string]: any;
}

export interface ToolInvocation {
  args: {
    title?: string | any;
    questions?: any[] | any;
    numQuestions?: number | any;
    [key: string]: any | any;
  };
  step: number | any;
  state: string | any;
  result: ToolResult;
  toolName: string;
  toolCallId: string;
}

export interface ChatMessage extends Message {
  tool_name?: string;
  tool_result?: any;
  createdAt?: Date | undefined;
  toolInvocations?: ToolInvocation[];
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
}

export interface ChatState {
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  fetchChats: () => Promise<void>;
  createChat: (title: string, firstMessage: Message) => Promise<string>;
  clearChats: () => void;
  // clearMessages: () => void;
  saveMessage: (
    chatId: string,
    message: Message | Message[],
    toolName?: string,
    toolResult?: any,
    toolInvocations?: ToolInvocation[]
  ) => Promise<void>;
  fetchMessages: (chatId: string) => Promise<ChatMessage[]>;
}

export interface Quiz {
  id: string;
  title: string;
  numQuestions: number;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

export interface QuizStore {
  quizzes: Record<string, Quiz>;
  setQuiz: (
    id: string,
    title: string,
    numQuestions: number,
    questions: Quiz['questions']
  ) => void;
  getQuizById: (id: string) => Quiz | undefined;
}
