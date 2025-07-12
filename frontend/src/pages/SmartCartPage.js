import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import CartModal from '../components/common/CartModal';

const SmartCartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [flashOfferTime, setFlashOfferTime] = useState(120); // 2 minutes in seconds

  React.useEffect(() => {
    const timer = setInterval(() => {
      setFlashOfferTime(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const estimatedSavings = Math.floor(cart.totalAmount * 0.15);
  const deliveryFee = cart.totalAmount > 500 ? 0 : 40;
  const finalTotal = cart.totalAmount + deliveryFee - (flashOfferTime > 0 ? 30 : 0);

  const handleCheckout = () => {
    setShowCheckout(true);
    setTimeout(() => {
      setShowCheckout(false);
      clearCart();
      alert('Order placed successfully! 🎉\nYour items will be delivered within 2 hours.');
    }, 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0071CE] text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">🛒 Your SmartCart + Store Assistant</h1>
            <p className="text-blue-100">Optimized route & smart checkout</p>
          </div>
        </div>
      </div>

      {/* Store Navigation Mini-Map */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🧭 Store Navigation
        </h2>
        <Card className="shadow-lg mb-6">
          <CardContent className="p-4">
            <div className="relative bg-blue-50 rounded-lg p-6 h-48">
              {/* Simplified store map */}
              <div className="absolute inset-4 border-2 border-dashed border-[#0071CE] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-[#0071CE] font-semibold">Interactive Store Map</p>
                  <p className="text-sm text-gray-600">Optimized route for your cart items</p>
                </div>
              </div>
              
              {/* Route indicators */}
              <div className="absolute top-6 left-6 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                📍 Nearby Deal!
              </div>
              <div className="absolute bottom-6 right-6 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                ✓ Optimal Route
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cart Summary */}
      <div className="px-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          💳 Cart Summary
        </h2>
        
        {cart.items.length === 0 ? (
          <Card className="shadow-md">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-4">Start shopping to see items here</p>
              <Button 
                onClick={() => window.history.back()}
                className="bg-[#0071CE] hover:bg-blue-700"
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Flash Offer */}
            {flashOfferTime > 0 && (
              <Card className="shadow-lg mb-4 border-l-4 border-red-500 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">⏰</span>
                      <div>
                        <h3 className="font-bold text-red-700">Flash Offer!</h3>
                        <p className="text-sm text-red-600">₹30 off if you checkout now</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{formatTime(flashOfferTime)}</div>
                      <div className="text-xs text-red-500">Time left</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cart Items */}
            <Card className="shadow-lg mb-4">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4">Items in Cart ({cart.totalItems})</h3>
                <div className="space-y-3">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-[#0071CE] font-semibold">₹{item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-[#0071CE] text-white flex items-center justify-center text-lg font-bold hover:bg-blue-700"
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
              </CardContent>
            </Card>

            {/* Bill Summary */}
            <Card className="shadow-lg mb-6">
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-4">Bill Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.totalItems} items)</span>
                    <span>₹{cart.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Estimated Savings</span>
                    <span>-₹{estimatedSavings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {flashOfferTime > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Flash Offer Discount</span>
                      <span>-₹30</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[#0071CE]">₹{finalTotal}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            {showCheckout ? (
              <Card className="shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-[#0071CE] rounded-full mb-4"></div>
                  <h3 className="text-xl font-semibold text-[#0071CE] mb-2">Processing Order...</h3>
                  <p className="text-gray-600">Optimizing delivery route</p>
                </CardContent>
              </Card>
            ) : (
              <Button 
                onClick={handleCheckout}
                className="w-full bg-[#FFC220] hover:bg-[#FFB000] text-black font-bold text-lg py-4"
              >
                🔘 Proceed to Checkout - ₹{finalTotal}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SmartCartPage;