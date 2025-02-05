// This is a temporary server-side storage solution
// In production, you would use a database instead
const quizServerStore = new Map<string, any>();

export function setServerQuiz(id: string, quizData: any) {
  quizServerStore.set(id, quizData);
}

export function getServerQuiz(id: string) {
  return quizServerStore.get(id);
}
