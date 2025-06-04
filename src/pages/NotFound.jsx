import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container fade-in">
        <h1>404 - Sahifa topilmadi</h1>
        <p>Qidirgan sahifa mavjud emas yoki o'chirib tashlangan.</p>
        <Link to="/" className="back-link">
          🔙 Ortga qaytish
        </Link>
      </div>
    </div>
  )
}

export default NotFound
