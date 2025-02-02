import { Navigators } from '@/components/navigators';
import Chat from '../components/chat';

export default function Home() {
  return (
    <div className=" relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden flex-col">
      <Chat />
    </div>
  );
}
