import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { analyzeCart } from '../services/aiAnalysisService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import CartItemPriceHistory from './CartItemPriceHistory';

const CartAnalysis = () => {
  const { cart } = useCart();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priceAlerts, setPriceAlerts] = useState<Array<{item: string, oldPrice: number, newPrice: number}>>([]);

  // Simulate price drops (in a real app, this would come from an API)
  useEffect(() => {
    const checkPriceDrops = () => {
      const alerts = cart.map(item => {
        // Simulate a 10% chance of price drop for each item
        if (Math.random() < 0.1) {
          const newPrice = item.price * 0.9; // 10% price drop
          return {
            item: item.title,
            oldPrice: item.price,
            newPrice: Number(newPrice.toFixed(2))
          };
        }
        return null;
      }).filter(Boolean);
      
      setPriceAlerts(alerts);
    };

    // Check for price drops every 30 seconds
    const interval = setInterval(checkPriceDrops, 30000);
    checkPriceDrops(); // Initial check

    return () => clearInterval(interval);
  }, [cart]);

  const handleAnalyze = async () => {
    if (cart.length === 0) {
      setError('Your cart is empty. Add some items to get analysis.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('Starting cart analysis...');
      const result = await analyzeCart(cart);
      // Enhanced formatting
      const sanitizedResult = result
        .replace(/[^\x20-\x7E\n]/g, '') // Remove non-printable characters
        .replace(/\n/g, '<br />') // Convert newlines to HTML breaks
        .replace(/\*\*(.*?)\*\*/g, '<span class="text-black">$1</span>') // Convert bold to normal
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>') // Convert italic
        .replace(/^Shopping Cart Analysis$/gm, '<h1 class="text-base mt-3 mb-1 text-black">$1</h1>') // Main title
        .replace(/^(Cart Overview|Value Assessment|Quality Assessment|Recommendations|Final Verdict)$/gm, '<h2 class="text-sm mt-2 mb-0.5 text-black">$1</h2>') // Section headers
        .replace(/^- (.*$)/gm, '<li class="ml-4 mb-0.5 list-disc text-xs">$1</li>'); // List items
      
      setAnalysis(sanitizedResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader className="p-3">
        <CardTitle className="text-sm text-black">AI Cart Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {priceAlerts.length > 0 && (
          <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium text-xs">Price Drop Alerts!</span>
            </div>
            {priceAlerts.map((alert, index) => (
              <div key={index} className="text-xs text-green-700 mb-1">
                {alert.item}: <span className="line-through">${alert.oldPrice}</span> → <span className="font-bold">${alert.newPrice}</span>
              </div>
            ))}
          </div>
        )}

        <Button 
          onClick={handleAnalyze} 
          disabled={loading}
          className="mb-3 bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black text-xs h-7"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Cart'
          )}
        </Button>

        {error && (
          <div className="text-red-500 mb-3 p-2 bg-red-50 rounded-md text-xs">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
            <p className="text-xs mt-0.5">Please check your API key and try again.</p>
          </div>
        )}

        {analysis && (
          <div className="prose prose-xs max-w-none">
            <div 
              className="space-y-1 text-black text-xs"
              dangerouslySetInnerHTML={{ __html: analysis }}
            />
          </div>
        )}

        <div className="mt-4 space-y-3">
          {cart.map((item) => (
            <CartItemPriceHistory key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartAnalysis; 