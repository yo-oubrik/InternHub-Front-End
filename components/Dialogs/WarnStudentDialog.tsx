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
import { StudentFlag } from "@/types/types";
import { calculateTotalSize } from "@/utils/utils";
import { X } from "lucide-react";
import { FileAttachment } from "../ui/file-attachment";
import "react-quill/dist/quill.snow.css";
import { Input } from "../ui/input";

import ReactQuill from "react-quill-new";
import TextEditor from "../TextEditor";
import { useState } from "react";

interface WarnStudentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (message: string, subject: string, attachments: File[]) => void;
  studentFlag: StudentFlag;
}

export function WarnStudentDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  studentFlag,
}: WarnStudentDialogProps) {
  const defautlSubject = `Warning: Inappropriate Behavior Reported`;
  const defaultReason = `This is a warning regarding inappropriate behavior reported in your internship application process. 
Reason for warning: ${studentFlag.reason}
Please be advised that such behavior is against our platform's policies and may result in account suspension.
Best regards,`;

  const [reason, setReason] = useState(defaultReason);
  const [subject, setSubject] = useState(defautlSubject);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5MB in bytes

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
    // onConfirm(reason, subject, attachments);
    console.log("Message:", reason);
  };

  const handleCancel = () => {
    setReason(defaultReason);
    setSubject(defautlSubject);
    setAttachments([]);
    setSizeError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Warning to Student</DialogTitle>
          <DialogDescription>
            Send a warning notification to{" "}
            <span className="font-medium">
              {studentFlag.firstName + " " + studentFlag.lastName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="message">Warning Message Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Warning Message Body</Label>
            <ReactQuill
              value={reason}
              onChange={setReason}
              style={{
                backgroundColor: "white",
              }}
              modules={{
                toolbar: true,
              }}
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
          <Button variant="destructive" onClick={handleConfirm}>
            Send Warning
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
