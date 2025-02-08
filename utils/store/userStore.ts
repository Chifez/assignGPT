import { create } from 'zustand';
import { createClient } from '../supabase/client';
import { User } from '@supabase/supabase-js';

interface UserState {
  user: User | null;
  initialized: boolean;
  setUser: (user: User | null) => void;
  initializeUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  initialized: false,
  setUser: (user) => set({ user }),
  initializeUser: async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ user, initialized: true });

    // Set up auth state change listener
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },
}));
