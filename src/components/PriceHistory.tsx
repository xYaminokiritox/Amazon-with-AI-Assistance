import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { geminiChat } from '../services/aiAnalysisService';

interface PriceHistoryProps {
  product: {
    title: string;
    price: number;
    category: string;
  };
}

const PriceHistory = ({ product }: PriceHistoryProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<{
    past: string;
    future: string;
    recommendation: string;
  } | null>(null);

  const analyzePrice = async () => {
    setLoading(true);
    setError(null);
    setHistory(null);

    try {
      const prompt = `You are a shopping expert and price analyst. For the product "${product.title}" (category: ${product.category}) currently priced at $${product.price}, provide:

1. Historical Price Analysis:
- What was the typical price range for similar products one year ago?
- How has the price trend changed over the past year?
- Any significant price drops or increases?

2. Future Price Prediction:
- What is the expected price trend for the next year?
- When might be the best time to buy?
- Any upcoming events or factors that might affect the price?

3. Buying Recommendation:
- Is this a good time to buy?
- Should the user wait for a better price?
- What price would be considered a good deal?

Format your response in a clear, concise way without markdown or special characters.`;

      const response = await geminiChat(prompt);
      
      // Parse the response into sections
      const sections = response.split('\n\n');
      const past = sections.find(s => s.toLowerCase().includes('historical')) || '';
      const future = sections.find(s => s.toLowerCase().includes('future')) || '';
      const recommendation = sections.find(s => s.toLowerCase().includes('recommendation')) || '';

      setHistory({ past, future, recommendation });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze price history');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-2">
      <CardHeader className="p-3">
        <CardTitle className="text-sm text-black">Price Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <Button
          onClick={analyzePrice}
          disabled={loading}
          className="w-full bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black text-xs h-7"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Price History & Trends'
          )}
        </Button>

        {error && (
          <div className="text-red-500 mt-2 p-2 bg-red-50 rounded-md text-xs">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {history && (
          <div className="mt-3 space-y-3">
            <div className="p-2 bg-blue-50 rounded text-xs text-blue-900 border border-blue-100">
              <div className="flex items-center gap-1 font-bold mb-1">
                <Clock className="h-3 w-3" />
                <span>Historical Price Analysis</span>
              </div>
              {history.past}
            </div>

            <div className="p-2 bg-green-50 rounded text-xs text-green-900 border border-green-100">
              <div className="flex items-center gap-1 font-bold mb-1">
                <TrendingUp className="h-3 w-3" />
                <span>Future Price Prediction</span>
              </div>
              {history.future}
            </div>

            <div className="p-2 bg-yellow-50 rounded text-xs text-yellow-900 border border-yellow-100">
              <div className="flex items-center gap-1 font-bold mb-1">
                <TrendingDown className="h-3 w-3" />
                <span>Buying Recommendation</span>
              </div>
              {history.recommendation}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceHistory; 