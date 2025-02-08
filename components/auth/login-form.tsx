'use client';

import { useState } from 'react';
import { signup, login } from '@/app/auth/login/actions';
import { Button } from '../ui/button';
import { useUserStore } from '@/utils/store/userStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoginFormProps } from '@/utils/types';
import { SubmitButton } from './submit-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [error, setError] = useState('');
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  async function handleAction(formData: FormData) {
    try {
      const action = isLogin ? login : signup;
      const result = await action(formData);

      if (result.success) {
        setUser(result.user);
        toast.success(result.message);
        onSuccess?.();
        router.push('/');

        if (result.verify) {
          setShowVerifyDialog(true);
        }
        // setShowVerifyDialog(result.verify);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Authentication failed');
    }
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>
      <form
        action={async (formData) => {
          await handleAction(formData);
        }}
        className="mt-8 space-y-6"
      >
        <div className="rounded-md shadow-sm space-y-2">
          <div>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div>
          <SubmitButton isLogin={isLogin} />
        </div>
      </form>

      <div className="text-center">
        <Button
          onClick={() => setIsLogin(!isLogin)}
          className="font-medium"
          variant="ghost"
          type="button"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
        </Button>
      </div>
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Email Verification Required</DialogTitle>
            <DialogDescription className="text-sm">
              A verification email has been sent to your email address. Please
              check your inbox and verify your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowVerifyDialog(false)}>Okay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
