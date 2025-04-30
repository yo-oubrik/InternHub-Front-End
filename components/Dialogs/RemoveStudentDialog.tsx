import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStudents } from "@/context/StudentsContext";
import { Student } from "@/types/types";

interface StudentToRemove {
  id: string;
  firstName: string;
  lastName: string;
}
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
  const { removeStudent } = useStudents();
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
            disabled={false}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              removeStudent(student.id);
              setIsOpen(false);
            }}
            disabled={false}
          >
            {false ? "Removing..." : "Remove Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
