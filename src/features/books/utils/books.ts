import type { BadgeVariant } from "@/lib/Badge/Badge";

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

export { getBadgeVariantByStatus, getBadgeTextByStatus };
