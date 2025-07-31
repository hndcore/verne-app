import type { BadgeVariant } from "@/lib/Badge/Badge";
import type { Author, BookExtended } from "../types/book";
import type { SortConfig } from "../store/tableStore";
import { formatDate } from "@/utils/date";

const getBadgeVariantByStatus = (status: string): BadgeVariant => {
  switch (status) {
    case "completed":
      return "success";
    case "reading":
      return "primary";
    case "not_started":
      return "secondary";
    case "dropped":
      return "danger";
    case "on_hold":
      return "outline";
    default:
      return "ghost";
  }
};

const getBadgeTextByStatus = (status: string): string => {
  switch (status) {
    case "completed":
      return "Completed";
    case "reading":
      return "Reading";
    case "not_started":
      return "Not Started";
    case "dropped":
      return "Dropped";
    case "on_hold":
      return "On Hold";
    default:
      return "";
  }
};

const sortBooks = (books: BookExtended[], sortConfig: SortConfig): BookExtended[] => {
  return [...books].sort((a: BookExtended, b: BookExtended) => {
    let aValue: string | number | Date | Author | null;
    let bValue: string | number | Date | Author | null;

    if (sortConfig.key === "authorId") {
      aValue = a.author?.name || "";
      bValue = b.author?.name || "";
    } else if (sortConfig.key === "genreId") {
      aValue = a.genre?.name || "";
      bValue = b.genre?.name || "";
    } else {
      aValue = a[sortConfig.key as keyof BookExtended];
      bValue = b[sortConfig.key as keyof BookExtended];
    }

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    if (sortConfig.key === "dateAdded") {
      const dateA = new Date(aValue as string);
      const dateB = new Date(bValue as string);
      return sortConfig.direction === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
      return sortConfig.direction === "asc" ? comparison : -comparison;
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};

const applyFilterToBooks = (books: BookExtended[], searchTerm: string): BookExtended[] => {
  if (!searchTerm) return books;
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return books.filter(
    book =>
      book.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      book.author.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      book.genre.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      book.status.replace("_", " ").toLowerCase().includes(lowerCaseSearchTerm) ||
      (book.rating !== null && book.rating.toString().includes(lowerCaseSearchTerm)) ||
      formatDate(book.dateAdded).toLowerCase().includes(lowerCaseSearchTerm),
  );
};

export { getBadgeVariantByStatus, getBadgeTextByStatus, sortBooks, applyFilterToBooks };
