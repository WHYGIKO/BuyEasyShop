"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchProductById } from "../../api/products";
import Loader from "../../components/Loader";
import Link from "next/link";

interface ProductDetail {
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
const ProductDetail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  

  useEffect(() => {
    // Router ready bo'lmaguncha ishlamaydi
    if (!router.isReady || !id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, id]);

  const nextImage = (): void => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = (): void => {
    if (product && product.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) return <Loader />;

  if (error || !product) {
    return (
      <div className="product-detail-error">
        <h2>{error || "Product not found"}</h2>
        <Link href="/" className="back-button">
          Back to Products
        </Link>
      </div>
    );
  }

  const discountPercentage = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-gallery">
          {product.images.length > 1 && (
            <button className="gallery-nav prev" onClick={prevImage}>
              &lt;
            </button>
          )}

          <img
            src={product.images[currentImageIndex] || product.thumbnail}
            alt={product.title}
            className="product-detail-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />

          {product.images.length > 1 && (
            <button className="gallery-nav next" onClick={nextImage}>
              &gt;
            </button>
          )}

          {product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} - view ${index + 1}`}
                  className={`thumbnail ${
                    currentImageIndex === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>

          <div className="product-meta">
            <div className="product-price-container">
              <span className="product-price">${product.price}</span>
              {discountPercentage > 0 && (
                <span className="product-discount">-{discountPercentage}%</span>
              )}
            </div>

            <div className="product-rating">
              <span className="rating-stars">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="rating-value">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-additional-info">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Availability:</strong> {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>

          <Link href="/" className="back-button">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;