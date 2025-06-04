import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
  // Truncate description to 3 lines (approximately 100 characters)
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{truncateDescription(product.description)}</p>
      </div>
    </Link>
  )
}

export default ProductCard
