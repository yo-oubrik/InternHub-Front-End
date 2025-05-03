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
import { StudentFlag } from "@/types/types";
import { useStudents } from "@/context/StudentsContext";
import React from "react";

interface IgnoreFlagDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  studentFlag: StudentFlag;
  onResolveFlag: (flagId: string) => void;
}
export function ReloveFlagDialog({
  isOpen,
  setIsOpen,
  studentFlag,
  onResolveFlag: onIgnoreFlag,
}: IgnoreFlagDialogProps) {
  const { resolveFlag } = useStudents();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleIgnoreFlag = async () => {
    setIsLoading(true);
    onIgnoreFlag(studentFlag.id);
    const success = await resolveFlag(studentFlag.id);
    setIsLoading(false);
    if (success) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Resolve Flag</DialogTitle>
          <DialogDescription>
            Are you sure you want to resolve this flag? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleIgnoreFlag}>
            {isLoading ? "Resolving the flag..." : "Resolve Flag"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
