'use client';

import { useState } from 'react';
import { signup, login } from '@/app/auth/login/actions';
import { Button } from '../ui/button';
import { useUserStore } from '@/utils/store/userStore';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoginFormProps } from '@/utils/types';
import { SubmitButton } from './submit-button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';

export function LoginForm({ onSuccess }: LoginFormProps) {
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
    <Card className="w-full max-w-md mx-auto shadow-none border-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email below to {isLogin ? 'login to' : 'create'} your
          account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div>
              <SubmitButton isLogin={isLogin} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="w-full"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
        </Button>
      </CardFooter>
    </Card>
  );
}
