'use client';

import { Copy, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface ResponseActionsProps {
  content: string;
  messageId: string;
}

export function ResponseActions({ content, messageId }: ResponseActionsProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  const handleFeedback = (type: 'up' | 'down') => {
    // TODO: Implement feedback functionality
    toast.success(`Feedback ${type} submitted`);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={handleCopy}
      >
        <Copy className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleFeedback('up')}
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => handleFeedback('down')}
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
