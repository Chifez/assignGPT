'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import Chat from '../components/chat/chat';
import { AppSidebar } from '@/components/app-sidebar';
import { Navigators } from '@/components/navigators';
export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Navigators />
        <div className="flex flex-row h-[calc(100vh_-_theme(spacing.16))]">
          <Chat />
        </div>
      </main>
    </SidebarProvider>
  );
}
