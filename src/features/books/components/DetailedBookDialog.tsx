import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/Dialog";
import Button from "@/lib/Button/Button";
import Badge from "@/lib/Badge/Badge";
import InputText from "@/lib/InputText/InputText";
import InputRate from "@/lib/InputRate/InputRate";
import { Eye } from "lucide-react";
import type { BookExtended } from "../types/book";
import { getBadgeTextByStatus, getBadgeVariantByStatus } from "../utils/books";
import { formatDate } from "@/utils/date";

interface DetailedBookDialogProps {
  book: BookExtended;
  isOpen: boolean;
  onClose: () => void;
}

const DetailedBookDialog: React.FC<DetailedBookDialogProps> = ({ book, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]" preventOutsideClick={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-stone-800">Book Details</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <InputText value={book.title} readOnly className="bg-gray-50" size="md" />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <InputText
              value={book.author?.name || "Unknown"}
              readOnly
              className="bg-gray-50"
              size="md"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
            <InputText
              value={book.genre?.name || "Unknown"}
              readOnly
              className="bg-gray-50"
              size="md"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex">
              <Badge variant={getBadgeVariantByStatus(book.status)}>
                {getBadgeTextByStatus(book.status)}
              </Badge>
            </div>
          </div>

          {/* Rating */}
          {book.rating && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex items-center">
                <InputRate value={book.rating} editable={false} size="md" />
                <span className="ml-2 text-sm text-gray-600">{book.rating}/5</span>
              </div>
            </div>
          )}

          {/* Date Added */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Added</label>
            <InputText
              value={formatDate(book.dateAdded)}
              readOnly
              className="bg-gray-50"
              size="md"
            />
          </div>
        </div>

        <DialogFooter>
          <Button testId="close-button-detail" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedBookDialog;
