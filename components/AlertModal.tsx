import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import clsx from 'clsx';


interface AlertModalProps {
    isOpenModal : boolean ; 
    setIsOpenModal : (open : boolean) => void ; 
    title? : string ;
    titleClassName? : string ; 
    content? : string ; 
    contentClassName? : string ;
    cancelButton? : boolean ;
    cancelButtonClassName? : string ;
    confirmButton? : boolean ;
    confirmButtonClassName? : string ;
    onConfirm? : () => void ;
    onCancel? : () => void ;
}
const AlertModal = ({
  isOpenModal,
  setIsOpenModal,
  title = "",
  titleClassName,
  content,
  contentClassName,
  confirmButton = true,
  confirmButtonClassName,
  onConfirm,
  cancelButton = true,
  cancelButtonClassName,
  onCancel,
}: AlertModalProps) => {
  return (
    <AlertDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={clsx(titleClassName)}>
            {title}
          </AlertDialogTitle>
          {content && (
            <AlertDialogDescription className={clsx(contentClassName)}>
              {content}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelButton && (
            <AlertDialogCancel
              className={clsx(cancelButtonClassName)}
              onClick={onCancel}
            >
              Cancel
            </AlertDialogCancel>
          )}
          {confirmButton && (
            <AlertDialogAction
              className={clsx(confirmButtonClassName)}
              onClick={onConfirm}
            >
              Confirm
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal
