
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';
import { AspectRatio } from './ui/aspect-ratio';
import ProductTooltip from './ProductTooltip';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <ProductTooltip 
      productTitle={category.name} 
      productDescription={`Browse our collection of ${category.name.toLowerCase()} products`}
    >
      <Link to={`/products/${category.id}`} className="block h-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg h-full flex flex-col">
          <AspectRatio ratio={16/9} className="bg-gray-100">
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover hover:opacity-90 transition-opacity"
            />
          </AspectRatio>
          <div className="p-4 text-center flex-grow flex items-center justify-center">
            <h3 className="font-medium text-base md:text-lg">{category.name}</h3>
          </div>
        </div>
      </Link>
    </ProductTooltip>
  );
};

export default CategoryCard;
