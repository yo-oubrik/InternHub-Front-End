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
import { CompanyFlag } from "@/types/types";
import { useCompanies } from "@/context/CompaniesContext";
import React from "react";

interface ResolveFlagDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  companyFlag: CompanyFlag;
  onResolveFlag: (flagId: string) => void;
}

export function ResolveCompanyFlagDialog({
  isOpen,
  setIsOpen,
  companyFlag,
  onResolveFlag,
}: ResolveFlagDialogProps) {
  const { resolveFlag } = useCompanies();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleResolveFlag = async () => {
    setIsLoading(true);
    onResolveFlag(companyFlag.id);
    const success = await resolveFlag(companyFlag.id);
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
          <Button variant="destructive" onClick={handleResolveFlag}>
            {isLoading ? "Resolving the flag..." : "Resolve Flag"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
