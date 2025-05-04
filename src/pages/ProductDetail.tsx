
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Star, Check, Truck, ShoppingCart, Sparkles } from 'lucide-react';
import ProductTooltip from '../components/ProductTooltip';
import ProductComparison from '../components/ProductComparison';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getProductSummary } from '../services/aiService';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const { addToCart, cart } = useCart();
  
  const product = products.find(p => p.id === productId);
  
  useEffect(() => {
    if (product) {
      // Find similar products in the same category
      const similar = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3);
      setSimilarProducts(similar);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you are looking for does not exist.</p>
        <Link to="/" className="text-amazon-secondary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const loadAiInsight = async () => {
    if (aiInsight || loadingInsight) return;
    
    setLoadingInsight(true);
    try {
      const insight = await getProductSummary(product.title, product.description);
      setAiInsight(insight);
    } catch (error) {
      console.error("Failed to get AI insight:", error);
    } finally {
      setLoadingInsight(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <ProductTooltip 
            productTitle={product.title}
            productDescription={product.description}
            productRating={product.rating.rate}
            productPrice={product.price}
          >
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[400px] object-contain"
              />
            </div>
          </ProductTooltip>
        </div>
        
        {/* Product Details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                size={18} 
                className={`${i < Math.floor(product.rating.rate) ? 'text-amazon-primary fill-amazon-primary' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.price > 35 && (
              <div className="text-sm text-green-600 mt-1 flex items-center">
                <Truck size={16} className="mr-1" />
                Free shipping
              </div>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          {/* Enhanced AI Insight Button with Dialog */}
          <div className="mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={loadAiInsight}
                  className="bg-amazon-light/5 text-amazon-dark border-amazon-primary/20 hover:bg-amazon-primary/10 flex items-center gap-2"
                >
                  <Sparkles size={16} className="text-amazon-primary" />
                  Smart Product Analysis
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles size={18} className="text-amazon-primary" />
                    AI Product Insight
                  </DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  {loadingInsight ? (
                    <div className="flex items-center justify-center gap-2 py-8">
                      <div className="w-4 h-4 rounded-full bg-amazon-primary animate-pulse"></div>
                      <span className="text-gray-500">Analyzing product details...</span>
                    </div>
                  ) : aiInsight ? (
                    <div className="space-y-4">
                      <p className="text-base">{aiInsight}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <div className="border border-gray-200 rounded-md p-3">
                          <h3 className="font-medium text-amazon-dark text-sm mb-2">Ideal For</h3>
                          <ul className="space-y-1">
                            {similarProducts.length > 0 ? (
                              <>
                                <li className="text-sm flex items-center gap-1">
                                  <Check size={14} className="text-green-500" /> 
                                  {product.category === "electronics" 
                                    ? "Tech enthusiasts" 
                                    : product.category === "jewelery"
                                    ? "Special occasions"
                                    : product.category.includes("clothing")
                                    ? "Everyday fashion"
                                    : "Practical use"}
                                </li>
                                <li className="text-sm flex items-center gap-1">
                                  <Check size={14} className="text-green-500" /> 
                                  {product.rating.rate >= 4.5 
                                    ? "Quality-focused buyers" 
                                    : product.price < 50
                                    ? "Budget-conscious shoppers"
                                    : "Premium experience"}
                                </li>
                              </>
                            ) : (
                              <li className="text-sm">Information unavailable</li>
                            )}
                          </ul>
                        </div>
                        
                        <div className="border border-gray-200 rounded-md p-3">
                          <h3 className="font-medium text-amazon-dark text-sm mb-2">Top Features</h3>
                          <ul className="space-y-1">
                            <li className="text-sm flex items-center gap-1">
                              <Check size={14} className="text-green-500" /> 
                              {product.price > 100 ? "Premium quality" : "Good value"}
                            </li>
                            <li className="text-sm flex items-center gap-1">
                              <Check size={14} className="text-green-500" /> 
                              {product.rating.count > 200 ? "Highly popular" : "Well received"}
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      {similarProducts.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h3 className="font-medium text-amazon-dark text-sm mb-2">Similar products you might like:</h3>
                          <ul className="space-y-2">
                            {similarProducts.slice(0, 2).map(item => (
                              <li key={item.id} className="text-sm flex justify-between">
                                <span className="text-amazon-secondary">{item.title.slice(0, 40)}...</span>
                                <span className="font-medium">${item.price.toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p>Click the button to analyze this product</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center space-x-2">
              <button 
                className="w-8 h-8 rounded-md border flex items-center justify-center"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button 
                className="w-8 h-8 rounded-md border flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Button 
              onClick={handleAddToCart} 
              className="bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black flex-1"
            >
              <ShoppingCart className="mr-2" size={18} />
              Add to Cart
            </Button>
            <Link to="/cart" className="flex-1">
              <Button 
                className="bg-amazon-yellow hover:bg-amazon-primary text-black hover:text-white w-full"
                onClick={handleAddToCart}
              >
                Buy Now
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 bg-white p-4 rounded-md shadow-sm">
            <h3 className="font-medium mb-2">Available</h3>
            <div className="flex items-center text-green-600 mb-2">
              <Check size={16} className="mr-1" />
              <span>In Stock</span>
            </div>
            <p className="text-sm text-gray-600">Order within 12 hours for same-day dispatch</p>
          </div>
          
          {/* Product Comparison based on cart items */}
          {cart.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-3">Shopping Analysis</h3>
              <ProductComparison product={product} otherProducts={cart} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
