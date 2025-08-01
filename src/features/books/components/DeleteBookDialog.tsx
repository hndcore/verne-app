import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/Dialog";
import Button from "@/lib/Button/Button";
import { Trash2 } from "lucide-react";

interface DeleteBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookTitle?: string;
  isDeleting?: boolean;
  testId?: string;
}

const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  bookTitle,
  isDeleting = false,
  testId = "delete-book-dialog",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]" preventOutsideClick={true} testId={testId}>
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2 text-red-600"
            data-testid={`${testId}-title`}
          >
            <Trash2 className="w-5 h-5" data-testid={`${testId}-icon`} />
            Delete Book
          </DialogTitle>
        </DialogHeader>

        <div className="py-4" data-testid={`${testId}-content`}>
          <p className="text-gray-700" data-testid={`${testId}-message`}>
            Are you sure you want to delete{" "}
            {bookTitle ? (
              <span className="font-semibold" data-testid={`${testId}-book-title`}>
                "{bookTitle}"
              </span>
            ) : (
              "this book"
            )}
            ?
          </p>
          <p className="text-gray-500 text-sm mt-2" data-testid={`${testId}-warning`}>
            This action cannot be undone.
          </p>
        </div>

        <DialogFooter data-testid={`${testId}-footer`}>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isDeleting}
            testId={`${testId}-cancel-button`}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            loading={isDeleting}
            testId={`${testId}-confirm-button`}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookDialog;
