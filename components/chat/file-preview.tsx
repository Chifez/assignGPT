import { FileText, X } from 'lucide-react';

interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export function FilePreview({ files, onRemove }: FilePreviewProps) {
  if (files.length === 0) return null;

  return (
    <div className="max-w-xl mx-auto mb-2 p-2 flex flex-wrap gap-2">
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
            onClick={() => onRemove(index)}
            className="absolute top-1 right-1 bg-white rounded-full"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>
      ))}
    </div>
  );
}
