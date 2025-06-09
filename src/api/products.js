
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
  console.log("Kelayotgan ID:", id)
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    console.log("Response:", response)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }
    const data = await response.json()
    console.log("Olingan ma'lumot:", data)
    return data
  } catch (error) {
    console.error(`Xato product olishda (ID: ${id}):`, error)
    throw error
  }
}
