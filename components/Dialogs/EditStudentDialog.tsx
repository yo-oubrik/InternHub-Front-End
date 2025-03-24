import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Student } from "@/types/types";
import { EditStudentForm } from "@/components/Forms/EditStudentForm";

interface UsersDialogProps {
  student: Student;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const EditStudentDialog: React.FC<UsersDialogProps> = ({
  student,
  isOpen,
  setIsOpen,
}) => {
  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-2 space-y-3">
          <DialogTitle>Update Student Information</DialogTitle>
          <DialogDescription>
            Please fill out the form below to update the student's information.
          </DialogDescription>
        </DialogHeader>

        <EditStudentForm student={student} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};
