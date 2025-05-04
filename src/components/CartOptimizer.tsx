import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { geminiChat } from '../services/aiAnalysisService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Package, ArrowRight } from 'lucide-react';

const CartOptimizer = () => {
  const { cart } = useCart();
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bundleRecommendations, setBundleRecommendations] = useState<string | null>(null);

  const filterText = (text: string) => {
    return text.replace(/[\#\*\_\~\`\>\[\]\(\)]/g, '').replace(/\s{2,}/g, ' ').trim();
  };

  const handleOptimize = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setBundleRecommendations(null);
    try {
      // Get individual item analysis
      let combinedResult = '';
      for (const item of cart) {
        const prompt = `You are a shopping expert. For the product "${item.title}" priced at $${item.price}, is it a good choice for this price range? Are there better alternatives available? If yes, which ones and why? Be precise, avoid markdown, #, *, and use only clear, plain text.`;
        const aiReply = await geminiChat(prompt);
        combinedResult += `${item.title}: ${filterText(aiReply)}\n`;
      }
      setResult(combinedResult);

      // Get bundle recommendations
      const bundlePrompt = `You are a shopping expert. Analyze these items in the cart and suggest potential bundles or complementary products that would make sense together: ${cart.map(item => item.title).join(', ')}. Focus on practical combinations that would save money or enhance the user experience. Be precise and avoid markdown formatting.`;
      const bundleReply = await geminiChat(bundlePrompt);
      setBundleRecommendations(filterText(bundleReply));
    } catch (err) {
      setError('Failed to get optimization from Gemini.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return null;

  return (
    <Card className="mt-4">
      <CardHeader className="p-3">
        <CardTitle className="text-sm text-black">Smart Cart Optimizer</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <Button
          onClick={handleOptimize}
          disabled={loading}
          className="mb-3 bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black text-xs h-7"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Optimizing...
            </>
          ) : (
            'Optimize My Cart'
          )}
        </Button>

        {error && (
          <div className="text-red-500 mb-3 p-2 bg-red-50 rounded-md text-xs">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded text-xs text-blue-900 whitespace-pre-line border border-blue-100">
              <div className="font-bold mb-2">Individual Item Analysis:</div>
              {result}
            </div>

            {bundleRecommendations && (
              <div className="p-3 bg-green-50 rounded text-xs text-green-900 whitespace-pre-line border border-green-100">
                <div className="flex items-center gap-2 font-bold mb-2">
                  <Package className="h-4 w-4" />
                  <span>Bundle Recommendations:</span>
                </div>
                {bundleRecommendations}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CartOptimizer; 