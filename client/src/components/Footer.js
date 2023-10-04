import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p> Snapstore is your premier destination for high-quality photography. Our team of photographers and artists is passionate about delivering stunning visuals that resonate with your audience.</p>
            <a href="/about" className="text-light">Learn More</a>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: <a href="mailto:moringaGroup2@snapstore.com" className="text-light">moringaGroup2@snapstore.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="text-light">074040123</a></li>
              <li><a href="/contact" className="text-light">Contact Form</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Connect with Us</h5>
            <ul className="list-unstyled list-inline">
              <li className="list-inline-item"><a href="https://www.facebook.com" className="text-light"><FaFacebook /></a></li>
              <li className="list-inline-item"><a href="https://www.twitter.com" className="text-light"><FaTwitter /></a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com" className="text-light"><FaInstagram /></a></li>
              <li className="list-inline-item"><a href="https://www.linkedin.com" className="text-light"><FaLinkedin /></a></li>
            </ul>
          </div>
        </div>
        <hr className="bg-secondary my-4" />
        <div className="row">
          <div className="col-md-4">
            <h5>Products</h5>
            <ul className="list-unstyled">
              <li><a href="/products" className="text-light">All Products</a></li>
              <li><a href="/categories" className="text-light">Product Categories</a></li>
              <li><a href="/specials" className="text-light">Special Offers</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Customer Support</h5>
            <ul className="list-unstyled">
              <li><a href="/faq" className="text-light">FAQs</a></li>
              <li><a href="/shipping" className="text-light">Shipping Information</a></li>
              <li><a href="/returns" className="text-light">Return Policy</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Subscribe to Newsletter</h5>
            <p>Stay updated with our latest products and offers.</p>
            <form>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <button type="submit" className="btn btn-primary"><FaEnvelope /> Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-danger mt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0">&copy; {new Date().getFullYear()} SNAPSTORE. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
