// API service for fetching products from dummyjson.com

export const fetchAllProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products")
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    throw error
  }
}
