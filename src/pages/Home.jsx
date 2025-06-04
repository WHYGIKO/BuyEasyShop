"use client"

import { useState, useEffect } from "react"
import { fetchAllProducts } from "../api/products"
import NavBar from "../components/NavBar"
import ProductCard from "../components/ProductCard"
import Pagination from "../components/Pagination"
import Loader from "../components/Loader"

const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })

  const productsPerPage = 9

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchAllProducts()
        setProducts(data.products)
        setFilteredProducts(data.products)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch products")
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredProducts(filtered)
    }
    setCurrentPage(1) // Reset to first page when filtering
  }, [searchQuery, products])

  // Sort products
  const handleSort = (key) => {
    let direction = "ascending"

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setFilteredProducts(sortedProducts)
  }

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Render sort button with arrow indicator
  const renderSortButton = (label, key) => {
    const isActive = sortConfig.key === key
    const direction = isActive ? sortConfig.direction : null

    return (
      <button className={`sort-button ${isActive ? "active" : ""}`} onClick={() => handleSort(key)}>
        {label} {isActive && (direction === "ascending" ? "↑" : "↓")}
      </button>
    )
  }

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

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />}
          </>
        )}
      </div>
    </div>
  )
}

export default Home
