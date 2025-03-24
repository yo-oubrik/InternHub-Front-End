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
import { Company } from "@/types/types";

interface DenyCompanyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  company: Company;
}

export function DenyCompanyDialog({
  isOpen,
  onOpenChange,
  company,
}: DenyCompanyDialogProps) {
  const defaultReason = `Dear ${company.name},

We regret to inform you that after careful consideration, we are unable to approve your company registration at this time.

If you would like to appeal this decision or have any questions, please contact our support team.

Best regards,
The Administration Team`;
  const [reason, setReason] = useState(defaultReason);

  const handleDeny = () => {
    // Implement deny logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Deny Company</DialogTitle>
          <DialogDescription>
            Are you sure you want to deny {company.name}? Please provide a
            reason.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for denial"
            className="min-h-[280px] bg-white"
          />
        </div>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeny}>
            Deny
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
