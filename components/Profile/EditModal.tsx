import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import clsx from "clsx";
import TextEditor from "../TextEditor";
import { useState } from "react";

interface EditModalProps {
  isOpenModal: boolean;
  setIsOpenModal: (open: boolean) => void;
  title?: React.ReactNode;
  titleClassName?: string;
  description?: React.ReactNode;
  descriptionClassName?: string;
  body?: React.ReactNode;
  cancelButton?: string;
  cancelButtonClassName?: string;
  confirmButton?: string;
  confirmButtonClassName?: string;
  onConfirm?: ( input : any ) => void;
  onCancel?: () => void;
}

const EditModal = ({
  isOpenModal,
  setIsOpenModal,
  title ,
  titleClassName , 
  description,
  descriptionClassName,
  body,
  cancelButton,
  cancelButtonClassName,
  confirmButton,
  confirmButtonClassName,
  onConfirm,
  onCancel,
}: EditModalProps) => {
  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className={clsx(titleClassName)}>{title}</DialogTitle>
          <DialogDescription className={clsx(descriptionClassName)}>
            {description}
          </DialogDescription>
        </DialogHeader>
        {body}
        <DialogFooter>
          {cancelButton && (
            <Button className={clsx(cancelButtonClassName)} onClick={onCancel}>
              {cancelButton}
            </Button>
          )}
          {confirmButton && (
            <Button
              className={clsx(confirmButtonClassName)}
              onClick={onConfirm}
            >
              {confirmButton}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
