'use client';

import { useEffect } from 'react';
import { Ellipsis, LogOut, Plus } from 'lucide-react';

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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useUserStore } from '@/utils/store/userStore';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { useChatStore } from '@/utils/store/chatStore';
import { EllipsisVertical } from 'lucide-react';

export function AppSidebar() {
  const {
    chats,
    fetchChats,
    setCurrentChatId,
    clearChats,
    deleteChat,
    currentChatId,
  } = useChatStore();
  const { user, setUser } = useUserStore();
  const { toggleSidebar, isMobile } = useSidebar();

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

  const deleteCurrentChat = async (id: string) => {
    const chatPromise = deleteChat(id);

    await toast.promise(chatPromise, {
      loading: 'Deleting chat...',
      success: 'Chat deleted successfully!',
      error: 'Oops, something went wrong!',
    });
  };
  useEffect(() => {
    fetchChats();
  }, [user]);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-start mt-2 mb-8 space-y-2">
            <div className="w-full flex items-center justify-between font-semibold text-xl">
              <p className="text-black">AssignGPT</p>
              <Button
                variant="ghost"
                onClick={() => {
                  setCurrentChatId(null);
                  isMobile && toggleSidebar();
                }}
              >
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
                  className={` ${
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
                    className="flex items-center justify-between"
                  >
                    <span className="overflow-hidden text-nowrap">
                      {chat.title}
                    </span>
                    <Popover>
                      <PopoverTrigger
                        asChild
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Ellipsis
                          size={14}
                          strokeWidth={1.25}
                          className="invisible group-hover/menu-item:visible text-black"
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-fit p-2 text-xs cursor-pointer"
                        onClick={() => deleteCurrentChat(chat.id)}
                      >
                        delete
                      </PopoverContent>
                    </Popover>
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
