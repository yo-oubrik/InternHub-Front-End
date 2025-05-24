"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Internship, Student, StudentFlag } from "@/types/types";
import { calculateTotalSize } from "@/utils/utils";
import { X } from "lucide-react";
import { FileAttachment } from "../ui/file-attachment";
import { Input } from "../ui/input";

import ReactQuill from "react-quill-new";
import TextEditor from "../TextEditor";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

interface FlagStudentDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: (message: string, subject: string, attachments: File[]) => void;
  studentFlagged: Student;
}

export function FlagStudentDialog({
  isOpen,
  setIsOpen,
  onConfirm,
  studentFlagged,
}: FlagStudentDialogProps) {

  const [bodyMessage, setBodyMessage] = useState("Enter description");
  const [subject, setSubject] = useState("Enter Reason");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  MAX_ATTACHMENT_SIZE;
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const newTotalSize = calculateTotalSize([...attachments, ...newFiles]);

    if (newTotalSize > MAX_ATTACHMENT_SIZE) {
      setSizeError(
        `Total attachment size exceeds 5MB limit (${(
          newTotalSize /
          1024 /
          1024
        ).toFixed(2)}MB)`
      );
      return;
    }

    setSizeError(null);
    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      const newAttachments = prev.filter((_, i) => i !== index);
      const newTotalSize = calculateTotalSize(newAttachments);
      if (newTotalSize <= MAX_ATTACHMENT_SIZE) {
        setSizeError(null);
      }
      return newAttachments;
    });
  };

  const handleConfirm = () => {
    onConfirm(bodyMessage, subject, attachments);
  };

  const handleCancel = () => {
    setBodyMessage("");
    setSubject("");
    setAttachments([]);
    setSizeError(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[calc(100vh-10rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Flag Student</DialogTitle>
          <DialogDescription>
            Flag{" "}
            <span className="font-medium">
              {studentFlagged.firstName + " " + studentFlagged.lastName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="message">Reason</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Description</Label>
            <Textarea
              value={bodyMessage}
              onChange={(e) => setBodyMessage(e.target.value)}
              className="caret-primary bg-white text-base flex-grow h-[250px] max-h-[300px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments</Label>
            <FileAttachment
              onFilesChange={handleFileChange}
              maxSize={MAX_ATTACHMENT_SIZE}
              onSizeError={setSizeError}
            />

            {sizeError && <p className="text-red-500 text-sm">{sizeError}</p>}

            {attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-medium truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-gray-500">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleConfirm}>
            Flag Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
