import { ArrowUp, Paperclip, Square } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { ChatInputProps } from '@/utils/types';

export function ChatInput({
  input,
  isLoading,
  onSubmit,
  onChange,
  onFileSelect,
}: ChatInputProps) {
  return (
    <Card className="group focus-within:ring-2 focus-within:ring-black p-2 bg-slate-100">
      <form onSubmit={onSubmit} className="space-y-2">
        <div>
          <Input
            minLength={2}
            type="text"
            value={input}
            onChange={onChange}
            className="w-full shadow-none focus:outline-none border-none focus-visible:ring-0 focus:border-none focus:ring-0"
            placeholder="What quiz would you like to take today..."
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="cursor-pointer p-2">
            <Paperclip size={20} strokeWidth={1.5} className="-rotate-45" />
            <input
              type="file"
              multiple
              className="hidden"
              onChange={onFileSelect}
            />
          </label>

          <Button
            type="submit"
            disabled={!input.trim() && !isLoading}
            className="p-[10px] rounded-full"
          >
            {isLoading ? (
              <Square className="h-6 w-6" />
            ) : (
              <ArrowUp className="h-6 w-6" />
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
