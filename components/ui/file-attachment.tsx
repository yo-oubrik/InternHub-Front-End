"use client";

import { cn } from "@/lib/utils";
import { calculateTotalSize } from "@/utils/utils";
import { UploadIcon } from "lucide-react";
import React, { useRef, useState } from "react";

interface FileAttachmentProps {
  onFilesChange: (file: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // Maximum size in bytes
  onSizeError?: (message: string) => void;
}

export function FileAttachment({
  onFilesChange,
  accept = "*",
  multiple = true,
  maxSize = 5 * 1024 * 1024, // Default 5MB
  onSizeError,
  ...props
}: FileAttachmentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;
      validateAndProcessFiles(files);
    }
  };

  const validateAndProcessFiles = (files: FileList) => {
    // Check total size of file
    let totalSize = calculateTotalSize([...files]);

    if (totalSize > maxSize) {
      const message = `Total attachment size exceeds ${(
        maxSize /
        1024 /
        1024
      ).toFixed(0)}MB limit (${(totalSize / 1024 / 1024).toFixed(2)}MB)`;
      if (onSizeError) {
        onSizeError(message);
        return;
      }
    }

    onFilesChange(files);
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center gap-2",
        isDragging ? "border-primary bg-primary/5" : "border-gray-300"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      {...props}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) =>
          e.target.files && validateAndProcessFiles(e.target.files)
        }
      />
      <div className="flex flex-col items-center gap-1">
        <UploadIcon className="h-6 w-6 text-gray-400" />
        <p className="text-sm text-gray-500">
          <span className="font-medium">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400">PDF, DOC, JPG, PNG (Max 5MB)</p>
      </div>
    </div>
  );
}
