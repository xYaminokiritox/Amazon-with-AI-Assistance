
import React, { useState, useEffect } from 'react';
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger 
} from '@/components/ui/hover-card';
import { getProductSummary } from '../services/aiService';
import { Sparkles, Star } from 'lucide-react';

interface ProductTooltipProps {
  children: React.ReactNode;
  productTitle: string;
  productDescription: string;
  productRating?: number;
  productPrice?: number;
}

const ProductTooltip: React.FC<ProductTooltipProps> = ({ 
  children, 
  productTitle,
  productDescription,
  productRating,
  productPrice
}) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [useCases, setUseCases] = useState<string[]>([]);

  const loadSummary = async () => {
    if (summary) return;
    
    setLoading(true);
    try {
      const result = await getProductSummary(productTitle, productDescription);
      setSummary(result);
      
      // Generate creative use cases based on product title
      const generatedUseCases = generateUseCases(productTitle, productDescription);
      setUseCases(generatedUseCases);
    } catch (error) {
      console.error("Failed to load AI summary:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const generateUseCases = (title: string, description: string): string[] => {
    // Simple algorithm to generate use cases based on product keywords
    const keywords = [title.toLowerCase(), description.toLowerCase()].join(' ');
    const useCases: string[] = [];
    
    if (keywords.includes('electronics') || keywords.includes('device') || keywords.includes('gadget')) {
      useCases.push('Perfect for tech enthusiasts');
      useCases.push('Great for home office setup');
    }
    
    if (keywords.includes('jewelry') || keywords.includes('gold') || keywords.includes('silver')) {
      useCases.push('Ideal for special occasions');
      useCases.push('Makes a thoughtful gift');
    }
    
    if (keywords.includes('clothing') || keywords.includes('shirt') || keywords.includes('jacket')) {
      useCases.push('Versatile for casual and formal settings');
      useCases.push('Layer with other pieces for a complete look');
    }
    
    if (keywords.includes('kitchen') || keywords.includes('cook') || keywords.includes('food')) {
      useCases.push('Enhance your culinary experience');
      useCases.push('Save time in meal preparation');
    }
    
    // Default use cases if none matched
    if (useCases.length === 0) {
      useCases.push('Highly rated by customers');
      useCases.push('Excellent value for money');
    }
    
    return useCases;
  };

  return (
    <HoverCard openDelay={300} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div onMouseEnter={loadSummary}>
          {children}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white/95 backdrop-blur-sm shadow-lg rounded-md border border-gray-100 p-4 transition-all duration-300 animate-in fade-in zoom-in-95">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-amazon-dark flex items-center gap-1">
              <Sparkles size={16} className="text-amazon-primary" /> AI Insight
            </h4>
            {productPrice && (
              <span className="text-sm font-bold bg-amazon-yellow/20 px-2 py-0.5 rounded-full">
                ${productPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {productRating && (
            <div className="flex items-center text-xs">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    className={`${i < Math.floor(productRating) ? 'text-amazon-primary fill-amazon-primary' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="ml-1 text-gray-600">({productRating.toFixed(1)})</span>
            </div>
          )}
          
          <div className="text-sm">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-amazon-primary animate-pulse"></div>
                <span className="text-gray-500">Analyzing product...</span>
              </div>
            ) : (
              <>
                <p className="text-gray-700">{summary || "Hover to analyze this product"}</p>
                
                {useCases.length > 0 && !loading && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <h5 className="text-xs font-medium mb-1 text-amazon-secondary">IDEAL FOR</h5>
                    <ul className="grid grid-cols-2 gap-1">
                      {useCases.map((useCase, index) => (
                        <li key={index} className="text-xs flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-amazon-primary mr-1"></span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500 italic">
                  AI-powered insights may not be 100% accurate
                </div>
              </>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProductTooltip;
