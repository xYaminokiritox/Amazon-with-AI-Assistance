
import React, { useEffect, useState } from 'react';
import { getProductComparison } from '../services/aiService';
import { Product } from '../types';
import { Check, Info, Sparkles } from 'lucide-react';

interface ProductComparisonProps {
  product: Product;
  otherProducts: Product[];
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ product, otherProducts }) => {
  const [loading, setLoading] = useState(true);
  const [comparison, setComparison] = useState<{
    review: string;
    recommendation: string | null;
    keyFeatures: string[];
    alternatives: {name: string, reason: string}[] | null;
  } | null>(null);

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        setLoading(true);
        const result = await getProductComparison(product, otherProducts);
        setComparison(result);
      } catch (error) {
        console.error('Error getting product comparison:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, [product, otherProducts]);

  if (loading) {
    return (
      <div className="mt-2 text-sm flex items-center gap-2">
        <div className="w-3 h-3 bg-amazon-primary rounded-full animate-pulse"></div>
        <span className="text-gray-500">AI analyzing your selection...</span>
      </div>
    );
  }

  if (!comparison) return null;

  return (
    <div className="mt-3 text-sm border rounded-md border-gray-200 p-4 bg-white shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-amazon-primary" />
          <span className="text-sm font-semibold">AI Shopping Assistant</span>
        </div>
        
        <div>
          <div className="mb-1 flex items-center gap-1">
            <span className="text-xs font-semibold bg-amazon-primary/10 px-2 py-0.5 rounded-full text-amazon-dark">PRODUCT REVIEW</span>
          </div>
          <p className="text-gray-700">{comparison.review}</p>
        </div>
        
        <div className="grid gap-1">
          <div className="mb-1 flex items-center gap-1">
            <span className="text-xs font-semibold bg-amazon-primary/10 px-2 py-0.5 rounded-full text-amazon-dark">KEY FEATURES</span>
          </div>
          <ul className="grid gap-1">
            {comparison.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check size={14} className="text-green-500 shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {comparison.alternatives && (
          <div>
            <div className="mb-1 flex items-center gap-1">
              <span className="text-xs font-semibold bg-amazon-secondary/10 px-2 py-0.5 rounded-full text-amazon-secondary">ALTERNATIVES TO CONSIDER</span>
            </div>
            <ul className="grid gap-2">
              {comparison.alternatives.map((alt, index) => (
                <li key={index} className="border-l-2 border-amazon-secondary/30 pl-3">
                  <p className="text-amazon-dark font-medium">{alt.name}</p>
                  <p className="text-xs text-gray-600">{alt.reason}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {comparison.recommendation && (
          <div className="mt-2 flex items-start gap-2 bg-amazon-light/5 p-2 rounded-md">
            <Info size={16} className="text-amazon-secondary shrink-0 mt-0.5" />
            <p className="text-amazon-secondary text-sm">{comparison.recommendation}</p>
          </div>
        )}
        
        <div className="mt-1 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500 italic text-center">AI-powered insights based on product information and customer reviews</p>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
