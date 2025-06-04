"use client";

import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api/products";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { useRouter, useSearchParams } from "next/navigation";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(queryPage);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  const productsPerPage = 9;

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        setProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", 1);
    router.push(`?${params.toString()}`);
  }, [searchQuery, products]);

  const handleSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredProducts(sortedProducts);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber);
    router.push(`?${params.toString()}`);
  };

  const renderSortButton = (label, key) => {
    const isActive = sortConfig.key === key;
    const direction = isActive ? sortConfig.direction : null;

    return (
      <button
        className={`sort-button ${isActive ? "active" : ""}`}
        onClick={() => handleSort(key)}
      >
        {label} {isActive && (direction === "ascending" ? "↑" : "↓")}
      </button>
    );
  };

  return (
    <div className="home-page">
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="content-container">
        <h1 className="page-title fade-in">PRODUCTS</h1>

        <div className="sort-container">
          <span>Sort By:</span>
          {renderSortButton("Title", "title")}
          {renderSortButton("Price", "price")}
          {renderSortButton("Rating", "rating")}
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error-message">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">
            <h2>No products found</h2>
            <p>Try a different search term</p>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
