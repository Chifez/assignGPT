'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log('error', error);
    return redirect('/error');
  }

  // Show success toast and return user data
  return {
    success: true,
    message: 'Signup successful!',
    user: data.user,
  };
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log('error', error);
    return redirect('/error');
  }

  // Show success toast and return user data
  return {
    success: true,
    message: 'Login successful!',
    user: data.user,
  };
}
