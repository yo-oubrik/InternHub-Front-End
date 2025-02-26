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
import { Company } from "@/types/types";

interface AcceptCompanyDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  company: Company;
}

export function AcceptCompanyDialog({
  isOpen,
  onOpenChange,
  company,
}: AcceptCompanyDialogProps) {
  const handleAccept = () => {
    // Implement accept logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accept Company</DialogTitle>
          <DialogDescription>
            Are you sure you want to accept {company.name}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAccept}>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
