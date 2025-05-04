import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingCart, BrainCircuit } from 'lucide-react'; // Import BrainCircuit
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProductComparison from '../components/ProductComparison';
import CartAnalysis from '../components/CartAnalysis';
import { products } from '../data/products';
import CartOptimizer from '../components/CartOptimizer';
import { CartSustainabilityScore } from '../components/SustainabilityScore';
import Watchlist from '../components/Watchlist';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Simulate AI analysis
  const handleAnalyzeCart = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError(null);

    // Prepare data for AI (simplified)
    const cartDetails = cart.map(item => `${item.quantity}x ${item.title} ($${item.price.toFixed(2)})`).join(', ');
    const prompt = `Analyze the following shopping cart items: ${cartDetails}. Provide a brief summary, assess value for money, and suggest potential alternatives if applicable.`;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // In a real app, you'd call your AI API here with the prompt
      // For now, we'll return a mock response
      const mockResponse = `**AI Cart Analysis:**

You have ${cart.length} item(s) totaling $${getCartTotal().toFixed(2)}. 

*Value Assessment:* Based on the items, this seems like a reasonable purchase. Consider if you need all items right now.

*Alternatives:* You might also like [Alternative Product A] or [Alternative Product B] based on your selection.`;
      setAnalysisResult(mockResponse);
    } catch (error) {
      console.error("AI Analysis Error:", error);
      setAnalysisError("Sorry, couldn't analyze the cart right now. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/">
            <Button className="bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Filter out products already in cart to get potential alternatives
  const alternativeProducts = products.filter(
    p => !cart.some(item => item.id === p.id)
  );
  
  const totalCount = cart.length;
  const greenCount = cart.filter(item => /eco|green/i.test(item.title)).length;
  const avgScore = totalCount > 0 ? Math.round((greenCount / totalCount) * 10) : 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items and Analysis */}
        <div className="flex-1">
          {/* Cart Items */}
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-md shadow-md p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain"
                />
              </Link>
              
              <div className="flex-1">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-medium">{item.title}</h3>
                </Link>
                <p className="text-amazon-primary font-bold">${item.price.toFixed(2)}</p>
                {item.price > 35 && (
                  <span className="text-sm text-green-600">Eligible for FREE Shipping</span>
                )}
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center border rounded-md">
                    <button 
                      className="px-2 py-1 border-r"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button 
                      className="px-2 py-1 border-l"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-gray-500 hover:text-red-500 flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" /> Remove
                  </button>
                </div>
                
                <ProductComparison 
                  product={item}
                  otherProducts={alternativeProducts}
                />
              </div>
              
              <div className="font-bold text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              className="text-red-500 border-red-500 hover:bg-red-50"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
            <Link to="/">
              <Button variant="link" className="text-amazon-secondary">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Add AI Analysis Component here */}
          <CartAnalysis />

          <div className="flex flex-col gap-4 mt-4">
            <CartOptimizer />
            <CartSustainabilityScore avgScore={avgScore} greenCount={greenCount} totalCount={totalCount} />
            <Watchlist />
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)}):</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{getCartTotal() > 35 ? "FREE" : "$4.99"}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>
                    $
                    {(
                      getCartTotal() +
                      (getCartTotal() > 35 ? 0 : 4.99) +
                      getCartTotal() * 0.1
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
