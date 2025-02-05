'use client';

import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Plus,
  Search,
  Settings,
} from 'lucide-react';

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

// history interface

interface History {
  title: string;
  onclick: () => void;
}

export function AppSidebar() {
  const [history, setHistory] = useState<History[]>([]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-start mt-2 mb-8 space-y-2">
            <div className="w-full flex items-center justify-between font-semibold text-xl">
              <p className="text-black">AssignGPT</p>
              <Plus size={20} />
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
        <SidebarFooter className="absolute bottom-0 mx-auto w-full flex flex-row items-center justify-center gap-1">
          logout
          <LogOut />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
