import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchResults = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortMethod, setSortMethod] = useState('relevance');

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts([]);
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    let results = products.filter(product => 
      product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.category.toLowerCase().includes(lowerCaseSearchTerm)
    );

    // Sort products
    switch (sortMethod) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'relevance':
      default:
        // Basic relevance: prioritize title matches
        results.sort((a, b) => {
          const aTitleMatch = a.title.toLowerCase().includes(lowerCaseSearchTerm);
          const bTitleMatch = b.title.toLowerCase().includes(lowerCaseSearchTerm);
          if (aTitleMatch && !bTitleMatch) return -1;
          if (!aTitleMatch && bTitleMatch) return 1;
          return 0; // Keep original order for non-title matches or both title matches
        });
        break;
    }

    setFilteredProducts(results);
  }, [searchTerm, sortMethod]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Search Results for "{searchTerm}"</h1>
      <p className="text-sm text-gray-600 mb-6">{filteredProducts.length} results found</p>

      <div className="flex justify-end items-center mb-6">
        <Select value={sortMethod} onValueChange={(value) => setSortMethod(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No products found matching your search term.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;