"use client"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = []

  // Create array of page numbers to display
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination">
      <button className="pagination-button" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        &lt;
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-button ${currentPage === number ? "active" : ""}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
