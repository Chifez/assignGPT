'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import { Quiz } from './quiz';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ArrowUp, Paperclip, FileText, X } from 'lucide-react';
import { Button } from './ui/button';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [files, setFiles] = useState<File[]>([]);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  // Remove a selected file
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 group w-full overflow-auto px-2 py-2">
      <div className="flex-1 max-w-xl mx-auto mt-10 mb-36">
        {messages.map((message) => (
          <div
            key={message.id}
            className="whitespace-pre-wrap flex flex-col mb-5"
          >
            <div
              className={`${
                message.role === 'user'
                  ? 'bg-slate-200 ml-auto'
                  : 'bg-transparent'
              } p-2 rounded-lg`}
            >
              {message.content as string}
              {/* {message.reasoning && <pre>{message.reasoning}</pre>}
              {message.content} */}
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

      <div className="bg-white absolute mx-auto bottom-0 w-full h-fit pb-2">
        <div className="max-w-xl mx-auto mb-2 p-2 flex flex-wrap gap-2">
          {files.length > 0 && (
            <>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center justify-center size-14 bg-gray-200 p-1 rounded-md text-sm"
                >
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-[70%] rounded-sm"
                    />
                  ) : (
                    <FileText />
                  )}
                  <span className="truncate max-w-full h-[30%] text-[10px]">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-white rounded-full"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="w-full max-w-xl mx-auto">
          <Card className="group focus-within:ring-2 focus-within:ring-black p-2 bg-slate-100">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <Input
                  minLength={2}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="w-full shadow-none focus:outline-none border-none focus-visible:ring-0 focus:border-none focus:ring-0"
                  placeholder="What quiz would you like to take today..."
                />
              </div>
              <div className="flex justify-between items-center">
                <label className="cursor-pointer p-2">
                  <Paperclip
                    size={20}
                    strokeWidth={1.5}
                    className="-rotate-45"
                  />
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                <Button
                  disabled={!input.trim()}
                  className="p-[10px] rounded-full"
                >
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
