'use client';

import { Plus } from 'lucide-react';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { Button } from './ui/button';

export const Navigators = () => {
  const { state, open, openMobile, toggleSidebar } = useSidebar();
  return (
    <div
      className={`flex flex-col ${
        open ? 'w-[calc(100vw_-_16rem)]' : 'w-[100vw]'
      } flex-1 `}
    >
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
        <div>
          <Button>Login</Button>
        </div>
      </section>
    </div>
  );
};
