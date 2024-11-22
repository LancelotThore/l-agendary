import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_PAGE_BUTTONS = 5;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageButtons = () => {
    const pages = [];
    const halfMaxButtons = Math.floor(MAX_PAGE_BUTTONS / 2);

    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(totalPages, currentPage + halfMaxButtons);

    if (currentPage <= halfMaxButtons) {
      endPage = Math.min(totalPages, MAX_PAGE_BUTTONS);
    } else if (currentPage + halfMaxButtons >= totalPages) {
      startPage = Math.max(1, totalPages - MAX_PAGE_BUTTONS + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          className={currentPage === i ? 'bg-primary/50 hover:bg-primary/50' : ''}
        >
          {i}
        </Button>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <Button key="1" onClick={() => handlePageClick(1)}>
          1
        </Button>
      );
      if (startPage > 2) {
        pages.splice(1, 0, <span key="start-ellipsis">...</span>);
      }
    }

    if (endPage < totalPages) {
      pages.push(
        <Button key={totalPages} onClick={() => handlePageClick(totalPages)}>
          {totalPages}
        </Button>
      );
      if (endPage < totalPages - 1) {
        pages.splice(pages.length - 1, 0, <span key="end-ellipsis">...</span>);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {totalPages > 1 && (
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
      )}
      <div className="flex gap-2">
        {renderPageButtons()}
      </div>
      {totalPages > 1 && (
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      )}
    </div>
  );
};

export default Pagination;