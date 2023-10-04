import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 fixed-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">&copy; {new Date().getFullYear()} SNAPSTORE</p>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled list-inline text-md-right mb-0">
              <li className="list-inline-item"><a href="/about" className="text-light">About</a></li>
              <li className="list-inline-item"><a href="/contact" className="text-light">Contact</a></li>
              <li className="list-inline-item"><a href="https://www.facebook.com" className="text-light">Facebook</a></li>
              <li className="list-inline-item"><a href="https://www.twitter.com" className="text-light">Twitter</a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com" className="text-light">Instagram</a></li>
              <li className="list-inline-item"><a href="https://www.linkedin.com" className="text-light">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
