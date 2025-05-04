
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../types';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { AspectRatio } from './ui/aspect-ratio';
import ProductTooltip from './ProductTooltip';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <ProductTooltip 
      productTitle={product.title} 
      productDescription={product.description}
      productRating={product.rating.rate}
      productPrice={product.price}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col h-full">
        <Link to={`/product/${product.id}`} className="block overflow-hidden">
          <AspectRatio ratio={1} className="bg-white p-2">
            <div className="h-full w-full flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain transition-transform hover:scale-105"
              />
            </div>
          </AspectRatio>
        </Link>
        
        <div className="p-4 flex flex-col flex-grow">
          <Link to={`/product/${product.id}`} className="flex-grow">
            <h3 className="font-medium text-md mb-2 line-clamp-2 h-12 hover:text-amazon-secondary transition-colors">{product.title}</h3>
          </Link>
          
          <div className="flex items-center mb-2">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={`${i < Math.floor(product.rating.rate) ? 'text-amazon-primary fill-amazon-primary' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">({product.rating.count})</span>
          </div>
          
          <div className="flex justify-between items-center mt-auto">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            <Button 
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }} 
              className="bg-amazon-primary hover:bg-amazon-yellow text-white hover:text-black transition-colors"
              size="sm"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </ProductTooltip>
  );
};

export default ProductCard;
