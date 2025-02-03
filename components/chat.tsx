'use client';

import { useChat } from 'ai/react';
import { Quiz } from '../app/components/quiz';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ArrowUp, Paperclip } from 'lucide-react';
import { Button } from './ui/button';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="flex-1 group w-full overflow-auto px-2">
      <div className="h-[90%] flex-1 max-w-xl mx-auto mt-10 mb-24">
        {messages.map((message) => (
          <div key={message.id} className="whitespace-pre-wrap flex mb-5">
            <div
              className={`${
                message.role === 'user'
                  ? 'bg-slate-200 ml-auto'
                  : 'bg-transparent'
              } p-2 rounded-lg`}
            >
              {message.content as string}
            </div>

            <div>
              {message.toolInvocations?.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === 'result') {
                  if (toolName === 'generateQuiz') {
                    const { result } = toolInvocation;
                    return (
                      <div key={toolCallId}>
                        <Quiz {...result} />
                      </div>
                    );
                  }
                } else {
                  return (
                    <div key={toolCallId}>
                      {toolName === 'generateQuiz' ? (
                        <div>Loading quiz...</div>
                      ) : null}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
      <div className=" bg-white  sticky mx-auto bottom-0 w-full h-[20%]">
        <div className="w-full max-w-xl mx-auto">
          <Card className="group focus-within:ring-2 focus-within:ring-black p-2 bg-slate-100">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <Input
                  minLength={2}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="w-full focus:outline-none border-none focus-visible:ring-0 focus:border-none focus:ring-0"
                  placeholder="What quiz would you like to take today..."
                />
              </div>
              <div className="flex justify-between items-center">
                <Button variant="ghost" className="p-2">
                  <Paperclip className="-rotate-45" />
                </Button>
                <Button disabled={!input.trim()} className="p-2 rounded-full">
                  <ArrowUp size={24} />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
