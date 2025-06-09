"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchProductById } from "../api/products";
import Loader from "../components/Loader";
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
  const { id } = router.query as { id?: string }; // id ni string deb aniq belgiladik
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details");
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

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
        <h2>Mahsulot topilmadi</h2>
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
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} - view ${index + 1}`}
                  className={`thumbnail ${
                    currentImageIndex === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
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
              <span className="rating-value">{product.rating}</span>
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
              <strong>Stock:</strong> {product.stock} units
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
