'use client';

import { Plus } from 'lucide-react';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoginForm } from './auth/login-form';
import { useUserStore } from '@/utils/store/userStore';
import { useState } from 'react';
import { useChatStore } from '@/utils/store/chatStore';

export const Navigators = () => {
  const { open, isMobile } = useSidebar();
  const { setCurrentChatId } = useChatStore();
  const user = useUserStore((state) => state.user);
  const [isAuthOpen, setAuthIsOpen] = useState(false);

  const setNavWidth = () => {
    if (!isMobile) {
      return open ? 'w-[calc(100vw_-_16rem)]' : 'w-[100vw]';
    }
    return 'w-[100vw]';
  };

  return (
    <div
      className={` sticky top-0 bg-white flex flex-col z-40 flex-1 ${setNavWidth()}`}
    >
      <section className="w-full flex justify-between p-2">
        <div className="flex items-center space-x-2 mx-2">
          <SidebarTrigger className="mt-2 border rounded-md p-2" />
          {!open ||
            (isMobile && (
              <Button
                data-sidebar="trigger"
                variant="ghost"
                size="icon"
                onClick={() => setCurrentChatId(null)}
                className="mt-2 size-7 border rounded-md p-2"
              >
                <Plus />
              </Button>
            ))}
        </div>
        {user == null ? (
          <Dialog open={isAuthOpen} onOpenChange={setAuthIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Login
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="sr-only">Authentication</DialogTitle>
                <DialogDescription className="sr-only">
                  Login or create an account to continue
                </DialogDescription>
              </DialogHeader>
              <LoginForm onSuccess={() => setAuthIsOpen(false)} />
            </DialogContent>
          </Dialog>
        ) : (
          <p className="text-sm mt-2 font-medium">{user?.email}</p>
        )}
      </section>
    </div>
  );
};
