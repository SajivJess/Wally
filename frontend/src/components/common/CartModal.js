import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setShowCheckout(true);
    setTimeout(() => {
      setShowCheckout(false);
      clearCart();
      onClose();
      alert('Order placed successfully! 🎉');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#0071CE]">Shopping Cart</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {cart.items.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🛒</div>
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-[#0071CE] font-semibold">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-[#0071CE] text-white flex items-center justify-center text-lg font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-[#0071CE]">₹{cart.totalAmount}</span>
                </div>
                <p className="text-sm text-gray-500">{cart.totalItems} items</p>
              </div>

              {showCheckout ? (
                <div className="text-center py-4">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-[#0071CE] rounded-full" role="status" aria-label="loading">
                  </div>
                  <p className="mt-2 text-[#0071CE]">Processing order...</p>
                </div>
              ) : (
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-[#FFC220] hover:bg-[#FFB000] text-black font-semibold"
                >
                  Proceed to Checkout
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CartModal;