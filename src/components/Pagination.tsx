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
  testId?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  testId = "pagination",
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex items-center justify-between px-6 py-4 border-t border-[#e0dad1] bg-[#f7f6f2]"
      data-testid={`${testId}-container`}
      aria-label="Pagination Navigation"
    >
      <div className="flex items-center gap-4" data-testid={`${testId}-info`}>
        <span
          className="text-sm text-gray-700"
          aria-live="polite"
          aria-label="Pagination information"
        >
          {startItem}-{endItem} of {totalItems}
        </span>
      </div>

      <div className="flex items-center gap-1" data-testid={`${testId}-controls`}>
        <Button
          testId={`${testId}-first-button`}
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
        >
          <ChevronsLeft className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">First page</span>
        </Button>
        <Button
          testId={`${testId}-previous-button`}
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Previous page</span>
        </Button>

        <div className="flex items-center gap-1" data-testid={`${testId}-pages`}>
          {getVisiblePages(currentPage, totalPages).map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span
                  className="px-3 py-1 text-sm text-gray-500"
                  data-testid={`${testId}-ellipsis-${index}`}
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : (
                <Button
                  testId={`${testId}-page-${page}`}
                  variant={page === currentPage ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className="min-w-[32px]"
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          testId={`${testId}-next-button`}
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Next page</span>
        </Button>
        <Button
          testId={`${testId}-last-button`}
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
        >
          <ChevronsRight className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Last page</span>
        </Button>
      </div>
    </nav>
  );
};

export default Pagination;
