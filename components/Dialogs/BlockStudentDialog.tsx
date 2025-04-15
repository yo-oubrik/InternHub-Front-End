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
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface StudentToBlock {
  id: string;
  firstName: string;
  lastName: string;
}
interface BlockStudentDialogProps {
  studentToBlock: StudentToBlock;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const BlockStudentDialog: React.FC<BlockStudentDialogProps> = ({
  studentToBlock: student,
  isOpen,
  setIsOpen,
}) => {
  const isLoading = false;
  const defaultBlock = "";

  const [message, setMessage] = useState(defaultBlock);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-2">Block Student</DialogTitle>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="message">Block Email Body</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] bg-white"
              />
            </div>
          </div>
          <DialogDescription>
            Are you sure you want to block {student.firstName}{" "}
            {student.lastName}? This action can be undone later.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              //   blockStudent(student.id);
              setIsOpen(false);
            }}
            disabled={isLoading}
          >
            {isLoading ? "Blocking..." : "Block Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
