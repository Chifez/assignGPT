'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/utils/store/userStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initialized, initializeUser } = useUserStore();

  useEffect(() => {
    if (!initialized) {
      initializeUser();
    }
  }, [initialized, initializeUser]);

  return <>{children}</>;
}
