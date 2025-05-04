
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-amazon-dark text-white mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 px-4">
          <div>
            <h3 className="font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm hover:underline">About Us</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Careers</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Press Releases</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Amazon Science</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm hover:underline">Sell products on Amazon</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Sell on Amazon Business</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Sell apps on Amazon</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Advertise Your Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Amazon Payment Products</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm hover:underline">Amazon Business Card</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Shop with Points</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Reload Your Balance</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Amazon Currency Converter</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm hover:underline">Amazon and COVID-19</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Your Account</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Your Orders</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Shipping Rates & Policies</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Returns & Replacements</Link></li>
              <li><Link to="#" className="text-sm hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 py-6 px-4 text-center">
          <div className="mb-4">
            <Link to="/" className="font-bold text-2xl text-amazon-primary">Amazon</Link>
          </div>
          <p className="text-sm text-gray-400">
            &copy; 2025 Amazon (demo). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
