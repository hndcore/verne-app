import React from "react";
import Button from "@/lib/Button/Button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { getVisiblePages } from "@/utils/data-table";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div
      className="flex items-center justify-between px-6 py-4 border-t border-[#e0dad1] bg-[#f7f6f2]"
      data-testid="pagination"
    >
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">
          {startItem}-{endItem} of {totalItems}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          testId="first-button"
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>
        <Button
          testId="previous-button"
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-1">
          {getVisiblePages(currentPage, totalPages).map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-3 py-1 text-sm text-gray-500">...</span>
              ) : (
                <Button
                  variant={page === currentPage ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className="min-w-[32px]"
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          testId="next-button"
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          testId="last-button"
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
