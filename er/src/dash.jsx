import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './st.css'; // Import CSS file for styling
import logo from './logo.png';

function Dash() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const quotes = [
    "Good food is the foundation of genuine happiness.",
    "Eating is a necessity, but cooking is an art.",
    "The secret ingredient is always love.",
    "Food is the ingredient that binds us together.",
    "One cannot think well, love well, sleep well, if one has not dined well."
  ];

  const [currentQuote, setCurrentQuote] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let typingTimeout;
    if (isTyping && charIndex < quotes[quoteIndex].length) {
      typingTimeout = setTimeout(() => {
        setCurrentQuote(prev => prev + quotes[quoteIndex].charAt(charIndex));
        setCharIndex(charIndex + 1);
      }, 100); // Speed of typing
    } else if (charIndex === quotes[quoteIndex].length) {
      setIsTyping(false);
      typingTimeout = setTimeout(() => {
        setIsTyping(true);
        setCurrentQuote("");
        setCharIndex(0);
        setQuoteIndex(prevIndex => (prevIndex + 1) % quotes.length);
      }, 2000); // Wait before switching to the next quote
    }
    return () => clearTimeout(typingTimeout);
  }, [charIndex, isTyping, quoteIndex, quotes]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleRequestStockClick = () => {
    navigate('/RequestGrocery'); // Redirect to the RequestGrocery route
  };

  const handleItemMasterClick = () => {
    navigate('/master'); // Redirect to the master route
  };

  return (
    <div className="container">
      <header className="header-section">
        <img src={logo} alt="Logo" className="logo" />
        <div className="header-text">
          <h1>G-Stock</h1>
          <h2>Efficient Grocery Stock Management</h2>
        </div>
        <div className="account-dropdown">
          <button className="account-button" onClick={toggleDropdown}>
            Account
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="#profile">Profile</a>
              <a href="#settings">Settings</a>
              <a href="#logout">Logout</a>
            </div>
          )}
        </div>
      </header>

      <div className="content-section">
        <div className="image-section">
          <img src="https://img.freepik.com/premium-vector/shopping-basket-with-foods-retail-super-market-goods_507816-718.jpg?semt=ais_hybrid" alt="Grocery Items" />
        </div>

        <div className="button-section">
          <h3>SUB - STORE MANAGER LIST</h3>
          <div className="buttons">
            <button className="animated-button" onClick={handleItemMasterClick}>
              ITEM MASTER
            </button>
            <button className="animated-button" onClick={handleRequestStockClick}>
              REQUEST STOCK
            </button>
          </div>
        </div>
      </div>

      <div className="quote-section">
        <p>{currentQuote}</p>
      </div>

      <footer className="footer-section">
        <p>© 2024 G-Stock | Contact us: stharun612@gmail.com | All rights reserved</p>
      </footer>
    </div>
  );
}

export default Dash;
