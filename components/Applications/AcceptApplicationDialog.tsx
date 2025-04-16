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
import { Student, StudentFlag } from "@/types/types";
import { calculateTotalSize } from "@/utils/utils";
import { X } from "lucide-react";
import { FileAttachment } from "../ui/file-attachment";
import { Input } from "../ui/input";

import ReactQuill from "react-quill-new";
import TextEditor from "../TextEditor";
import { useState } from "react";

interface AcceptApplicationDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: (message: string, subject: string, attachments: File[]) => void;
  studentAccepted: Student;
}

export function AcceptApplicationDialog({
  isOpen,
  setIsOpen,
  onConfirm,
  studentAccepted,
}: AcceptApplicationDialogProps) {
  const defautlSubject = `Internship Application Accepted`;
  const defaultBody = `<p>Dear candidate,</p></br>

<p>We are pleased to inform you that your internship application has been accepted. We were impressed with your qualifications and believe you would be a valuable addition to our team.</p></br>

<b>Please note that we would like to schedule an interview with you to discuss the internship details further.</b> </br> </br>

<p>We will contact you shortly to arrange a suitable time.</p></br>

<p>Please review the attached documents for further details about your internship, including potential start dates, duration, and other important information.</p></br>

<p>We look forward to meeting you and welcoming you to our team.</p></br>

<p>Best regards,</p>`;

  const [bodyMessage, setBodyMessage] = useState(defaultBody);
  const [subject, setSubject] = useState(defautlSubject);
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
    setBodyMessage(defaultBody);
    setSubject(defautlSubject);
    setAttachments([]);
    setSizeError(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>Accept Application</DialogTitle>
          <DialogDescription>
            Send acceptance notification to{" "}
            <span className="font-medium">
              {studentAccepted.firstName + " " + studentAccepted.lastName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="message">Email Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Acceptance Message</Label>
            <TextEditor
              value={bodyMessage}
              onChange={setBodyMessage}
              style={{
                backgroundColor: "white",
                whiteSpace: "pre-wrap",
              }}
              modules={{
                toolbar: true,
              }}
              className="whitespace-pre-wrap"
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
            Accept Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
