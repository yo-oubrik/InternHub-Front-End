import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileAttachment } from "../ui/file-attachment";
import { calculateTotalSize } from "@/utils/utils";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface StudentToBlock {
  id: string;
  firstName: string;
  lastName: string;
}

interface BlockStudentDialogProps {
  studentToBlock: StudentToBlock;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (
    message: string,
    subject: string,
    attachments: File[]
  ) => Promise<void>;
}

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const BlockStudentDialog: React.FC<BlockStudentDialogProps> = ({
  studentToBlock: student,
  isOpen,
  setIsOpen,
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const defaultSubject = `Account Blocking Notification`;
  const defaultMessage = `Dear ${student.firstName} ${student.lastName},

We regret to inform you that your account has been blocked due to violation of our platform's policies.

Please be advised that this action has been taken in accordance with our terms of service.

Best regards,
Admin Team`;

  const [message, setMessage] = useState(defaultMessage);
  const [subject, setSubject] = useState(defaultSubject);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sizeError, setSizeError] = useState<string | null>(null);

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

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(message, subject, attachments);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
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
          <DialogTitle>Block Student</DialogTitle>
          <DialogDescription>
            Block student account for{" "}
            <span className="font-medium">
              {student.firstName} {student.lastName}
            </span>
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
            <Label htmlFor="attachments">Attachments (Optional)</Label>
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
            {isLoading ? "Blocking..." : "Block Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
