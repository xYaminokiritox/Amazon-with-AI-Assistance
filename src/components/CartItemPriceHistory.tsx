import React, { useState } from 'react';
import { CartItem } from '../types';
import { geminiChat } from '../services/aiAnalysisService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface CartItemPriceHistoryProps {
  item: CartItem;
}

const CartItemPriceHistory: React.FC<CartItemPriceHistoryProps> = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priceHistory, setPriceHistory] = useState<{
    historical: string;
    prediction: string;
    recommendation: string;
  } | null>(null);

  const analyzePrice = async () => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `For "${item.title}" ($${item.price}), provide a brief price analysis in this exact format:

Historical: [price one year ago and change]
Future: [expected price next year]
Recommendation: [buy now or wait]

Keep each line very short and specific.`;

      const response = await geminiChat(prompt);
      
      // Split the response into lines and extract content
      const lines = response.split('\n');
      
      const getContent = (prefix: string): string => {
        const line = lines.find(l => l.toLowerCase().startsWith(prefix.toLowerCase()));
        if (!line) return 'No data available';
        return line.split(':')[1]?.trim() || 'No data available';
      };

      setPriceHistory({
        historical: getContent('Historical'),
        prediction: getContent('Future'),
        recommendation: getContent('Recommendation')
      });
    } catch (err) {
      console.error('Price analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze price. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-2">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-black">{item.title}</h3>
          <Button
            onClick={analyzePrice}
            disabled={loading}
            className="text-sm h-8 bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Check Price History'
            )}
          </Button>
        </div>

        {error && (
          <div className="text-red-500 mt-2 p-2 bg-red-50 rounded-md text-sm">
            <p>{error}</p>
          </div>
        )}

        {priceHistory && (
          <div className="mt-3 space-y-2">
            <div className="flex items-start gap-2">
              <DollarSign className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Historical Price</p>
                <p className="text-sm text-gray-600">{priceHistory.historical}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              {priceHistory.prediction.toLowerCase().includes('increase') ? (
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">Future Prediction</p>
                <p className="text-sm text-gray-600">{priceHistory.prediction}</p>
              </div>
            </div>

            <div className="p-2 bg-blue-50 rounded-md">
              <p className="text-sm font-medium text-blue-700">Recommendation</p>
              <p className="text-sm text-blue-600">{priceHistory.recommendation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CartItemPriceHistory; 