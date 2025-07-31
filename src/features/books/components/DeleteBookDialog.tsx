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
}

const DeleteBookDialog: React.FC<DeleteBookDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  bookTitle,
  isDeleting = false,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Delete Book
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to delete{" "}
            {bookTitle ? <span className="font-semibold">"{bookTitle}"</span> : "this book"}?
          </p>
          <p className="text-gray-500 text-sm mt-2">This action cannot be undone.</p>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm} loading={isDeleting}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookDialog;
