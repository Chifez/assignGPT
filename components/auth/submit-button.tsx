'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

export function SubmitButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      disabled={pending}
    >
      {pending ? 'Loading...' : isLogin ? 'Sign in' : 'Sign up'}
    </Button>
  );
}
