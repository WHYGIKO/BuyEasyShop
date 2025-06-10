"use client";

import Link from "next/link";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductCardProps {
  product: Partial<Product>; // Все поля становятся необязательными
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const truncateDescription = (text: string, maxLength = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Link href={`/product/${product.id}`} className="product-card">
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
        <p className="product-description">{truncateDescription(product.description || "")}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
