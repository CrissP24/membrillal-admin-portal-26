import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadBoxProps {
  onFileSelect: (file: { name: string; url: string }) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  onFileSelect,
  accept = '*/*',
  multiple = false,
  label = 'Arrastra archivos aquí o haz clic para seleccionar',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<Array<{ name: string; url: string }>>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    Array.from(selectedFiles).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const fileData = {
          name: file.name,
          url: dataUrl,
        };
        setFiles(prev => [...prev, fileData]);
        onFileSelect(fileData);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-ink-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
      >
        <Upload className="h-8 w-8 text-ink-400 mx-auto mb-2" />
        <p className="text-sm text-ink-600">{label}</p>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-ink-50 rounded-lg p-3"
            >
              <span className="text-sm text-ink-700 truncate flex-1">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

