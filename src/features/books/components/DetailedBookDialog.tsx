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
import type { BookExtended } from "../types/book";
import { getBadgeTextByStatus, getBadgeVariantByStatus } from "../utils/books";
import { formatDate } from "@/utils/date";

interface DetailedBookDialogProps {
  book: BookExtended;
  isOpen: boolean;
  onClose: () => void;
  testId?: string;
}

const DetailedBookDialog: React.FC<DetailedBookDialogProps> = ({
  book,
  isOpen,
  onClose,
  testId = "detailed-book-dialog",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]" preventOutsideClick={false} testId={testId}>
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2 text-stone-800"
            data-testid={`${testId}-title`}
          >
            Book Details
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6" data-testid={`${testId}-content`}>
          {/* Title */}
          <div data-testid={`${testId}-title-field`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <InputText
              value={book.title}
              readOnly
              className="bg-gray-50"
              size="md"
              testId={`${testId}-title-input`}
            />
          </div>

          {/* Author */}
          <div data-testid={`${testId}-author-field`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <InputText
              value={book.author?.name || "Unknown"}
              readOnly
              className="bg-gray-50"
              size="md"
              testId={`${testId}-author-input`}
            />
          </div>

          {/* Genre */}
          <div data-testid={`${testId}-genre-field`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
            <InputText
              value={book.genre?.name || "Unknown"}
              readOnly
              className="bg-gray-50"
              size="md"
              testId={`${testId}-genre-input`}
            />
          </div>

          {/* Status */}
          <div data-testid={`${testId}-status-field`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <div className="flex">
              <Badge
                variant={getBadgeVariantByStatus(book.status)}
                testId={`${testId}-status-badge`}
              >
                {getBadgeTextByStatus(book.status)}
              </Badge>
            </div>
          </div>

          {/* Rating */}
          {book.rating && (
            <div data-testid={`${testId}-rating-field`}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex items-center">
                <InputRate
                  value={book.rating}
                  editable={false}
                  size="md"
                  testId={`${testId}-rating-input`}
                />
                <span className="ml-2 text-sm text-gray-600" data-testid={`${testId}-rating-text`}>
                  {book.rating}/5
                </span>
              </div>
            </div>
          )}

          {/* Date Added */}
          <div data-testid={`${testId}-date-field`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Added</label>
            <InputText
              value={formatDate(book.dateAdded)}
              readOnly
              className="bg-gray-50"
              size="md"
              testId={`${testId}-date-input`}
            />
          </div>
        </div>

        <DialogFooter data-testid={`${testId}-footer`}>
          <Button testId={`${testId}-footer-close-button`} variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedBookDialog;
