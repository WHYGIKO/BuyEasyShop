"use client";

const Loader = () => {
  const skeletons = Array(9).fill(null)

  return (
    <div className="loader-container">
      <div className="products-grid">
        {skeletons.map((_, index) => (
          <div key={index} className="product-card skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-description"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loader
