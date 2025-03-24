import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StudentToRemove } from "@/types/types";
import { useState } from "react";
import toast from "react-hot-toast";

interface RemoveStudentDialogProps {
  studentToRemove: StudentToRemove;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const RemoveStudentDialog: React.FC<RemoveStudentDialogProps> = ({
  studentToRemove: student,
  isOpen,
  setIsOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveStudent = async () => {
    try {
      setIsLoading(true);

      console.log(`Removing student: ${student.firstName} ${student.lastName}`);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(`${student.firstName} ${student.lastName} removed!`);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to remove student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-2">Remove Student</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {student.firstName}{" "}
            {student.lastName}? This action cannot be undone.
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
            onClick={handleRemoveStudent}
            disabled={isLoading}
          >
            {isLoading ? "Removing..." : "Remove Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
