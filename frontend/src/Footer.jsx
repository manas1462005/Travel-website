// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>World Traveling</h2>
          <p>
            Traveling with loved ones, friends, or even fellow adventurers fosters
            a bond through shared experiences.
          </p>
        </div>
        <div className="footer-right">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
