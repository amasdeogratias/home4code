import React from "react";
import { FaCircleChevronRight } from "react-icons/fa6";


export default function Pagination({ totalPages, currentPage, handlePageChange }) {
  const pages = [];

  // Determine the range of pages to show
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage > totalPages - 3) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
  }

  return (
    <div className="pagination d-flex align-items-center justify-content-end gap-2">
      <button
        className="backbtn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaCircleChevronRight />
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          className={page === currentPage ? "active" : ""}
          onClick={() => handlePageChange(page)}
          disabled={page === "..."}>
          {page}
        </button>
      ))}

      <button
        className="nextbtn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaCircleChevronRight /> 
      </button>
    </div>
  );
}
