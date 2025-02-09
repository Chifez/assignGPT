'use client';

import { useEffect } from 'react';
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

import { useUserStore } from '@/utils/store/userStore';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { useChatStore } from '@/utils/store/chatStore';

export function AppSidebar() {
  const { chats, fetchChats, setCurrentChatId, clearChats, currentChatId } =
    useChatStore();
  const { user, setUser } = useUserStore();
  const { toggleSidebar, isMobile } = useSidebar();

  useEffect(() => {
    fetchChats();
  }, [user]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    if (isMobile) {
      toggleSidebar();
    }
    setUser(null);
    clearChats();
    toast.success('Signed out successfully');
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-start mt-2 mb-8 space-y-2">
            <div className="w-full flex items-center justify-between font-semibold text-xl">
              <p className="text-black">AssignGPT</p>
              <Button variant="ghost" onClick={() => setCurrentChatId(null)}>
                <Plus size={20} />
              </Button>
            </div>
            {!user && <p className="text-sm">Login to see your chat history</p>}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex-1">
              {chats.map((chat) => (
                <SidebarMenuItem
                  key={chat.id}
                  className={`${
                    currentChatId != null && currentChatId == chat.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : ''
                  }`}
                >
                  <SidebarMenuButton
                    onClick={() => {
                      setCurrentChatId(chat.id);
                      isMobile && toggleSidebar();
                    }}
                  >
                    <span>{chat.title}</span>
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
