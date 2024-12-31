import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>About Us</h4>
        <p>
          <Link to="/about">here</Link>.
        </p>
      </div>
      <div className="footer-section">
        <h4>Contact Info</h4>
        <p><Link to="/contact">here</Link>.</p>
      </div>
    </footer>
  );
};

export default Footer;
