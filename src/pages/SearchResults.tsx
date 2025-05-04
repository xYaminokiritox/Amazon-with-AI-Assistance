import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
// import { Input } from '@/components/ui/input'; // Removed unused import
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAISpecificProductSuggestions } from '../services/aiAnalysisService'; // Removed unused getTrendingProducts import
import { Product } from '../types'; // Import Product type

const SearchResults = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortMethod, setSortMethod] = useState('relevance');
  // Remove state for general AI suggestions (already removed)
  const [aiRecommendedProducts, setAiRecommendedProducts] = useState<Product[]>([]); // State for specific AI product recommendations
  const [loadingSpecificSuggestions, setLoadingSpecificSuggestions] = useState(false); // State for loading specific recommendations
  // Remove state for trending products
  // const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  // const [loadingTrending, setLoadingTrending] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts([]);
      setAiRecommendedProducts([]);
      // setTrendingProducts([]); // Remove clearing trending products
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    let results = products.filter(product => 
      product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.category.toLowerCase().includes(lowerCaseSearchTerm)
    );

    // Remove fetching general AI suggestions (already removed)

    // Fetch AI specific product recommendations
    const fetchSpecificSuggestions = async () => {
      setLoadingSpecificSuggestions(true);
      try {
        const recommendedIds = await getAISpecificProductSuggestions(searchTerm);
        const recommended = products.filter(p => recommendedIds.includes(p.id));
        setAiRecommendedProducts(recommended);
      } catch (error) {
        console.error("Failed to fetch AI specific product suggestions:", error);
        setAiRecommendedProducts([]);
      } finally {
        setLoadingSpecificSuggestions(false);
      }
    };

    // Remove Fetch Trending Products logic
    /*
    const fetchTrendingProducts = async () => {
      setLoadingTrending(true);
      try {
        const trendingIds = await getTrendingProducts(); // Call the new function
        const trending = products.filter(p => trendingIds.includes(p.id));
        setTrendingProducts(trending);
      } catch (error) {
        console.error("Failed to fetch trending products:", error);
        setTrendingProducts([]);
      } finally {
        setLoadingTrending(false);
      }
    };
    */

    fetchSpecificSuggestions();
    // fetchTrendingProducts(); // Remove call to fetch trending products

    // Sort products (regular search results)
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
        // Improved relevance: prioritize title, then category, then description matches
        results.sort((a, b) => {
          const aTitleMatch = a.title.toLowerCase().includes(lowerCaseSearchTerm);
          const bTitleMatch = b.title.toLowerCase().includes(lowerCaseSearchTerm);
          const aCategoryMatch = a.category.toLowerCase().includes(lowerCaseSearchTerm);
          const bCategoryMatch = b.category.toLowerCase().includes(lowerCaseSearchTerm);
          const aDescMatch = a.description.toLowerCase().includes(lowerCaseSearchTerm);
          const bDescMatch = b.description.toLowerCase().includes(lowerCaseSearchTerm);

          // Assign scores based on match type (higher score = more relevant)
          const scoreA = (aTitleMatch ? 3 : 0) + (aCategoryMatch ? 2 : 0) + (aDescMatch ? 1 : 0);
          const scoreB = (bTitleMatch ? 3 : 0) + (bCategoryMatch ? 2 : 0) + (bDescMatch ? 1 : 0);

          return scoreB - scoreA; // Sort descending by score
        });
        break;
    }

    setFilteredProducts(results);
  }, [searchTerm, sortMethod]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Search Results for "{searchTerm}"</h1>
      <p className="text-sm text-gray-600 mb-6">{filteredProducts.length} results found</p>

      {/* Remove AI Suggestions Section (already removed) */}

      {/* AI Specific Product Recommendations Section */}
      {loadingSpecificSuggestions && <p className="text-center text-gray-500 my-4">Loading AI recommendations...</p>} {/* Updated loading text */}
      {!loadingSpecificSuggestions && aiRecommendedProducts.length > 0 && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-semibold text-green-800 mb-4">AI Recommended Products based on "{searchTerm}":</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {aiRecommendedProducts.map(product => (
              <ProductCard key={`ai-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Remove Trending Products Section */}
      {/*
      {loadingTrending && <p className="text-center text-gray-500 my-4">Loading trending products...</p>}
      {!loadingTrending && trendingProducts.length > 0 && (
        <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-md">
          <h3 className="font-semibold text-purple-800 mb-4">Trending Products Right Now:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {trendingProducts.map(product => (
              <ProductCard key={`trending-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      )}
      */}

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

      {/* Regular Search Results Section Title */}
      {filteredProducts.length > 0 && !loadingSpecificSuggestions && aiRecommendedProducts.length > 0 && (
        <h2 className="text-xl font-semibold mb-4 border-t pt-4 mt-6">All Matching Results</h2>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No products found matching your search term.</p>
          {/* Optionally suggest checking AI recommendations if they exist */}
          {!loadingSpecificSuggestions && aiRecommendedProducts.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">Check out the AI recommended products above!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;