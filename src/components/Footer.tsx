"use client"

import { useState } from "react"

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setContactForm({
      ...contactForm,
      [name]: value,
    })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // In a real app, you would send this data to a server
    console.log("Form submitted:", contactForm)
    alert("Message sent! (This is a demo)")
    setContactForm({ name: "", email: "", message: "" })
    setShowPopup(false)
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-copyright">© 2025 BuyEasyShop | Contact: sardor.level@gmail.com</div>

        <div className="footer-social">
          <a href="https://t.me/vxmecy/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="icon-telegram">T</i>
          </a>
          <a href="https://instagram.com/vxmecy/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="icon-instagram">I</i>
          </a>
          <a href="https://twitter.com/whygiko" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="icon-twitter">X</i>
          </a>
        </div>

        
      </div>

      {showPopup && (
        <div className="contact-popup">
          <div className="popup-content">
            <button className="close-popup" onClick={() => setShowPopup(false)}>
              ×
            </button>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
