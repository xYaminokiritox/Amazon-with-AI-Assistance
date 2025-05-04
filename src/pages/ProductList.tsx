
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const ProductList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortMethod, setSortMethod] = useState('featured');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [freeShipping, setFreeShipping] = useState(false); // Keep this state, even if not used for filtering yet
  const [topRated, setTopRated] = useState(false);
  const [searchText, setSearchText] = useState(''); // Added state for search text

  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category if provided
    if (categoryId) {
      filtered = filtered.filter(product => product.category === categoryId);
    }

    // Filter by search text
    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(lowerCaseSearchText) ||
        product.description.toLowerCase().includes(lowerCaseSearchText) ||
        product.category.toLowerCase().includes(lowerCaseSearchText)
      );
    }
    
    // Apply price filters
    if (minPrice !== '') {
      filtered = filtered.filter(product => product.price >= Number(minPrice));
    }
    
    if (maxPrice !== '') {
      filtered = filtered.filter(product => product.price <= Number(maxPrice));
    }
    
    // Apply top-rated filter (4+ stars)
    if (topRated) {
      filtered = filtered.filter(product => product.rating.rate >= 4);
    }
    
    // Sort products
    switch (sortMethod) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default: // featured - keep original order or apply relevance if search text exists
        if (searchText) {
          const lowerCaseSearchText = searchText.toLowerCase();
          filtered.sort((a, b) => {
            const aTitleMatch = a.title.toLowerCase().includes(lowerCaseSearchText);
            const bTitleMatch = b.title.toLowerCase().includes(lowerCaseSearchText);
            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
            return 0; // Keep original order for non-title matches or both title matches
          });
        }
        break;
    }
    
    setFilteredProducts(filtered);
  }, [categoryId, sortMethod, minPrice, maxPrice, freeShipping, topRated, searchText]); // Added searchText dependency

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {categoryId 
          ? `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Products`
          : 'All Products'}
      </h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 bg-white p-4 rounded-md shadow-md space-y-4">
          <h2 className="font-bold text-lg mb-4">Filter Products</h2>

          <div>
            <Label htmlFor="search-filter" className="font-medium mb-2 block">Search</Label>
            <Input
              id="search-filter"
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Price</h3>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full"
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-start space-x-2 mb-2">
              <Checkbox
                id="top-rated"
                checked={topRated}
                onCheckedChange={() => setTopRated(!topRated)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="top-rated">Top Rated (4+ stars)</Label>
              </div>
            </div>
            
            {/* <div className="flex items-start space-x-2">
              <Checkbox
                id="free-shipping"
                checked={freeShipping}
                onCheckedChange={() => setFreeShipping(!freeShipping)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="free-shipping">Free Shipping</Label>
              </div>
            </div> */}
            {/* Free shipping filter commented out as it's not implemented in the data/logic */}
          </div>
        </div>
        
        {/* Products grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">{filteredProducts.length} products</p>
            
            <Select value={sortMethod} onValueChange={(value) => setSortMethod(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
