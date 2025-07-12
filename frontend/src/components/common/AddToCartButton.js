import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';

const AddToCartButton = ({ product, className = "" }) => {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);
  };

  return (
    <div className="relative">
      <Button
        onClick={handleAddToCart}
        className={`bg-[#0071CE] hover:bg-blue-700 text-white transition-all duration-200 ${className}`}
      >
        Add to Cart
      </Button>
      
      {showSuccess && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-bounce z-10">
          Item added! ✓
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;