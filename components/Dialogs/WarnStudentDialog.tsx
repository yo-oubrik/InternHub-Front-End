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
import { Textarea } from "@/components/ui/textarea";
import { StudentFlag } from "@/types/types";
import { useState } from "react";

interface WarnStudentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (message: string) => void;
  studentFlag: StudentFlag;
}

export function WarnStudentDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  studentFlag,
}: WarnStudentDialogProps) {
  const defaultWarning = ` This is a warning regarding inappropriate behavior reported in your internship application process.
Reason for warning: ${studentFlag.reason}
Please be advised that such behavior is against our platform's policies and may result in account suspension.
Best regards,
`;

  const [message, setMessage] = useState(defaultWarning);

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
            <Label htmlFor="message">Warning Message Body</Label>
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
