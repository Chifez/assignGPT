import { Navigators } from '@/components/navigators';
import Chat from '../components/chat';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Navigators />
        <div className=" relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden flex-col">
          <Chat />
        </div>
      </main>
    </SidebarProvider>
  );
}
