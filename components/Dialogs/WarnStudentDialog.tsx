"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface NotifyStudentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (message: string) => void;
  flaggedStudent: {
    firstName: string;
    lastName: string;
    email: string;
    reason: string;
  };
}

export function WarnStudentDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  flaggedStudent,
}: NotifyStudentDialogProps) {
  const defaultWarning = `Dear ${flaggedStudent.firstName} ${flaggedStudent.lastName},

This is a warning regarding inappropriate behavior reported in your internship application process.

Reason for warning: ${flaggedStudent.reason}

Please be advised that such behavior is against our platform's policies and may result in account suspension.

Best regards,
Admin Team`;

  const [message, setMessage] = useState(defaultWarning);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Warning to Student</DialogTitle>
          <DialogDescription>
            Send a warning notification to{" "}
            <span className="font-medium">{flaggedStudent.email}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="message">Warning Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[200px] bg-white"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setMessage(defaultWarning);
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => onConfirm(message)}>
            Send Warning
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
