import React from 'react';

// For product-level use
export const SustainabilityScore = ({ score, alternative }: { score: number, alternative?: string }) => (
  <div className="flex items-center gap-2 text-lg">
    <span className={`font-bold ${score > 7 ? 'text-green-600' : score > 4 ? 'text-yellow-600' : 'text-red-600'}`}>Green Score: {score}/10</span>
    {score < 6 && alternative && (
      <span className="ml-2 text-blue-700">Try: {alternative}</span>
    )}
  </div>
);

// For cart-level use
export const CartSustainabilityScore = ({ avgScore, greenCount, totalCount }: { avgScore: number, greenCount: number, totalCount: number }) => (
  <div className="bg-white rounded-md shadow-md border p-4 text-left">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
      <span className={`text-lg font-bold ${avgScore > 7 ? 'text-green-700' : avgScore > 4 ? 'text-yellow-700' : 'text-red-700'}`}>Cart Sustainability Score: {avgScore}/10</span>
      <span className="ml-2 text-base">({greenCount} of {totalCount} items are eco-friendly)</span>
    </div>
    <div className="mt-2 text-green-900 text-base font-medium text-left">
      {avgScore > 7 && 'Great job! Your cart is very eco-friendly.'}
      {avgScore <= 7 && avgScore > 4 && 'Consider swapping one or two items for greener alternatives to improve your score.'}
      {avgScore <= 4 && 'Many items in your cart have a high environmental impact. Try searching for eco-friendly options.'}
    </div>
  </div>
); 