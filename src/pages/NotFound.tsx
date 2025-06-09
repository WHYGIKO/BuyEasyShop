"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container fade-in">
        <h1>404 - Sahifa topilmadi</h1>
        <p>Qidirgan sahifa mavjud emas yoki o'chirib tashlangan.</p>
        <Link href="/" className="back-link">
          🔙 Ortga qaytish
        </Link>
      </div>
    </div>
  );
}
