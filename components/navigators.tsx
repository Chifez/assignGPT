'use client';

import { Plus } from 'lucide-react';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginPage from './auth/page';
import { useUserStore } from '@/utils/store/userStore';
import { useState } from 'react';

export const Navigators = () => {
  const { state, open, openMobile, isMobile, toggleSidebar } = useSidebar();
  const { user, setUser } = useUserStore();
  const [dialogOpen, setDialogOpen] = useState(false);

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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="sr-only">login</DialogTitle>
              <LoginPage onSuccess={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        ) : (
          <p>{user?.email}</p>
        )}
      </section>
    </div>
  );
};
