'use client';

import { LogOut, Plus } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useState } from 'react';
import { useUserStore } from '@/utils/store/userStore';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { History } from '@/utils/types';
import { Button } from './ui/button';

export function AppSidebar() {
  const [history, setHistory] = useState<History[]>([]);

  const { user, setUser } = useUserStore();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    toast.success('Signed out successfully');
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-start mt-2 mb-8 space-y-2">
            <div className="w-full flex items-center justify-between font-semibold text-xl">
              <p className="text-black">AssignGPT</p>
              <Button variant="ghost">
                <Plus size={20} />
              </Button>
            </div>
            <p className="text-sm">Login to see your chat history</p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className=" flex-1">
              {history.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button onClick={item.onclick}>
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {user && (
          <SidebarFooter
            onClick={handleSignOut}
            className="absolute bottom-0 mx-auto w-full"
          >
            <Button
              variant="ghost"
              className="cursor-pointer w-full flex flex-row items-center justify-center gap-1"
            >
              Logout
              <LogOut strokeWidth={1.25} />
            </Button>
          </SidebarFooter>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
