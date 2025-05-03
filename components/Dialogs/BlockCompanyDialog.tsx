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
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

interface BlockCompanyDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  companyToBlock: {
    id: string;
    name: string;
  };
  onConfirm: (message: string, subject: string, attachments: File[]) => void;
}

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5MB

export function BlockCompanyDialog({
  isOpen,
  setIsOpen,
  companyToBlock,
  onConfirm,
}: BlockCompanyDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const defaultSubject = `Account Blocking Notification`;
  const defaultMessage = `Dear ${companyToBlock.name},

This is to inform you that your account has been blocked due to violations of our platform's policies.

Your account will remain blocked until further notice. If you believe this is a mistake, please contact our support team.

Best regards,
Admin Team`;

  const [message, setMessage] = useState(defaultMessage);
  const [subject, setSubject] = useState(defaultSubject);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const calculateTotalSize = (files: File[]) => {
    return files.reduce((acc, file) => acc + file.size, 0);
  };

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
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setSizeError(null);
  };

  const handleConfirm = () => {
    setIsLoading(true);
    onConfirm(message, subject, attachments);
  };

  const handleCancel = () => {
    setMessage(defaultMessage);
    setSubject(defaultSubject);
    setAttachments([]);
    setSizeError(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Block Company</DialogTitle>
          <DialogDescription>
            Block account access for{" "}
            <span className="font-medium">{companyToBlock.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Block Notification Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Block Message</Label>
            <div className="min-h-[200px] bg-white rounded-md border">
              <ReactQuill
                value={message}
                onChange={setMessage}
                theme="snow"
                style={{ height: "150px" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments</Label>
            <Input
              id="attachments"
              type="file"
              onChange={(e) => handleFileChange(e.target.files)}
              multiple
              className="bg-white"
            />
            {sizeError && (
              <p className="text-sm text-red-500 mt-1">{sizeError}</p>
            )}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{file.name}</span>
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
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Blocking..." : "Block Company"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
