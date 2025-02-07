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

export const Navigators = () => {
  const { open, isMobile, toggleSidebar } = useSidebar();
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const setNavWidth = () => {
    if (!isMobile) {
      return open ? 'w-[calc(100vw_-_16rem)]' : 'w-[100vw]';
    }
    return 'w-[100vw]';
  };

  return (
    <div className={`flex flex-col flex-1 ${setNavWidth()}`}>
      <section className="w-full flex justify-between p-2">
        <div className="flex items-center space-x-2 mx-2">
          <SidebarTrigger className="mt-2 border rounded-md p-2" />
          {!open && (
            <Button
              data-sidebar="trigger"
              variant="ghost"
              size="icon"
              onClick={(event) => {
                toggleSidebar();
              }}
              className="mt-2 size-7 border rounded-md p-2"
            >
              <Plus />
            </Button>
          )}
        </div>
        {user == null ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Login
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Authentication</DialogTitle>
                <DialogDescription>
                  Login or create an account to continue
                </DialogDescription>
              </DialogHeader>
              <LoginForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
          </Dialog>
        ) : (
          <p className="text-sm mt-2 font-medium">{user?.email}</p>
        )}
      </section>
    </div>
  );
};
