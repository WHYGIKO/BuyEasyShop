import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <Link
          to={`?page=${number}`}
          key={number}
          className={number === currentPage ? "active" : ""}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
