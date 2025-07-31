const getVisiblePages = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 1) return [1];

  const DELTA = 2;
  const ELLIPSIS = "...";

  const startRange = Math.max(2, currentPage - DELTA);
  const endRange = Math.min(totalPages - 1, currentPage + DELTA);

  const middlePages: number[] = [];
  for (let i = startRange; i <= endRange; i++) {
    middlePages.push(i);
  }

  const pages: (number | string)[] = [];
  pages.push(1);

  const hasGapAtStart = startRange > 2;
  if (hasGapAtStart) {
    pages.push(ELLIPSIS);
  }

  middlePages.forEach(page => {
    if (page !== 1 && page !== totalPages) {
      pages.push(page);
    }
  });

  const hasGapAtEnd = endRange < totalPages - 1;
  if (hasGapAtEnd) {
    pages.push(ELLIPSIS);
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

export { getVisiblePages };
