'use client';

import { useChat } from 'ai/react';
import { Weather } from '../app/components/weather';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="max-h-screen group w-full overflow-auto">
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
                  if (toolName === 'displayWeather') {
                    const { result } = toolInvocation;
                    return (
                      <div key={toolCallId}>
                        <Weather {...result} />
                      </div>
                    );
                  }
                } else {
                  return (
                    <div key={toolCallId}>
                      {toolName === 'displayWeather' ? (
                        <div>Loading weather...</div>
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
          <Card className="p-2">
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <Input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none"
                  placeholder="Ask me anything..."
                />
                <Button disabled={!input.trim()}>
                  <ArrowUp />
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
