import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, Image, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useCart } from '../context/CartContext';
import VisualSearch from './VisualSearch';

const Header = () => {
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showVisualSearch, setShowVisualSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="bg-[#131921] sticky top-0 z-50">
      {/* Main navigation */}
      <div className="bg-[#131921]">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-2 px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/amazon-logo.png" alt="Amazon Logo" className="h-8 w-auto" />
            </Link>

            {/* Search bar */}
            <div className="hidden md:flex flex-1 mx-6">
              <form onSubmit={handleSearch} className="relative w-full flex">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-l-md rounded-r-none border-amazon-yellow text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  type="submit"
                  className="bg-amazon-yellow hover:bg-amazon-primary text-black rounded-l-none rounded-r-md"
                >
                  <Search size={20} />
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowVisualSearch(true)}
                  className="ml-2 bg-amazon-yellow hover:bg-amazon-primary text-black"
                  title="Visual Search"
                >
                  <Image size={20} />
                </Button>
              </form>
            </div>

            {/* Right navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-amazon-yellow transition">
                <div className="flex flex-col">
                  <span className="text-xs">Hello, Sign in</span>
                  <span className="font-bold">Account</span>
                </div>
              </Link>
              <Link to="/orders" className="text-white hover:text-amazon-yellow transition">
                <div className="flex flex-col">
                  <span className="text-xs">Returns</span>
                  <span className="font-bold">& Orders</span>
                </div>
              </Link>
              <Link to="/cart" className="text-white hover:text-amazon-yellow transition relative">
                <div className="flex items-end">
                  <ShoppingCart size={28} />
                  <span className="font-bold ml-1">Cart</span>
                  <span className="absolute -top-2 -right-2 bg-amazon-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {getCartCount()}
                  </span>
                </div>
              </Link>
            </div>

            {/* Mobile buttons */}
            <div className="flex items-center space-x-4 md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-amazon-yellow"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-amazon-yellow"
                onClick={() => setShowVisualSearch(true)}
                title="Visual Search"
              >
                <Image size={24} />
              </Button>
              <Link to="/cart" className="relative">
                <ShoppingCart size={24} className="text-white" />
                <span className="absolute -top-2 -right-2 bg-amazon-yellow text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {getCartCount()}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="px-4 pb-2 md:hidden">
        <form onSubmit={handleSearch} className="relative flex">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-l-md rounded-r-none border-amazon-yellow text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-amazon-yellow hover:bg-amazon-primary text-black rounded-l-none rounded-r-md"
          >
            <Search size={20} />
          </Button>
        </form>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-amazon-light">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="flex items-center text-white">
              <User size={18} className="mr-2" />
              <span>Account</span>
            </Link>
            <Link to="/orders" className="text-white">
              <span>Returns & Orders</span>
            </Link>
          </div>
        </div>
      )}

      {/* Category navigation */}
      <div className="bg-amazon-light">
        <div className="container mx-auto">
          <div className="px-4 py-1 flex items-center flex-wrap gap-x-4 gap-y-1">
            <Link to="/" className="text-sm text-white hover:text-amazon-yellow transition flex items-center">
              <Menu className="mr-1" />
              All
            </Link>
            <Link to="/products/electronics" className="text-sm text-white hover:text-amazon-yellow transition">
              Electronics
            </Link>
            <Link to="/products/clothing" className="text-sm text-white hover:text-amazon-yellow transition">
              Clothing
            </Link>
            <Link to="/products/home" className="text-sm text-white hover:text-amazon-yellow transition">
              Home & Kitchen
            </Link>
            <Link to="/products/accessories" className="text-sm text-white hover:text-amazon-yellow transition">
              Accessories
            </Link>
            <Link to="/products/backpacks" className="text-sm text-white hover:text-amazon-yellow transition">
              Backpacks
            </Link>
          </div>
        </div>
      </div>

      {/* Visual Search Modal */}
      {showVisualSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Visual Search</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowVisualSearch(false)}
              >
                <X size={20} />
              </Button>
            </div>
            <div className="p-4">
              <VisualSearch />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
