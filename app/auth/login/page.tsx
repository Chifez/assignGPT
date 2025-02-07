'use client';

import { useState } from 'react';
import { signup, login } from './actions';
import { Button } from '../../../components/ui/button';
import { useUserStore } from '@/utils/store/userStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoginPageProps } from '@/utils/types';

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
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
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Authentication failed');
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
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
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-black text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </Button>
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
      </div>
    </div>
  );
}
