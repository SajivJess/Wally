import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import AddToCartButton from '../components/common/AddToCartButton';
import { mockUser, smartTips, exclusiveDrops } from '../data/mockData';
import { useCart } from '../context/CartContext';
import CartModal from '../components/common/CartModal';

const AdvisorPage = () => {
  const { cart } = useCart();
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const topProducts = [
    { name: "Organic Rice - 5kg", count: 8, savings: "₹120" },
    { name: "Detergent Powder", count: 6, savings: "₹80" },
    { name: "Cooking Oil - 1L", count: 5, savings: "₹45" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0071CE] text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">👤 Your Smart Dashboard</h1>
            <p className="text-blue-100">AI-powered insights & recommendations</p>
          </div>
          <button
            onClick={() => setCartModalOpen(true)}
            className="relative bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition-all duration-200"
          >
            🛒
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {cart.totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="px-6 mt-6">
        <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              📊 This Month's Summary
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">₹{mockUser.savingsThisMonth}</div>
                <p className="text-green-700 font-medium">You saved!</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0071CE]">{mockUser.points}</div>
                <p className="text-blue-700 font-medium">Reward Points</p>
              </div>
            </div>
            
            {/* Top 3 Products */}
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-3 text-gray-800">🏆 Your Top 3 Products</h3>
              <div className="space-y-2">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                      <div>
                        <span className="font-medium">{product.name}</span>
                        <p className="text-sm text-gray-600">Bought {product.count} times</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">{product.savings}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Switch Tips */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          💡 Smart Switch Tips
        </h2>
        <div className="space-y-4">
          {smartTips.map((tip) => (
            <Card key={tip.id} className="shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-[#FFC220]">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={tip.image} 
                    alt={tip.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{tip.title}</h3>
                    <p className="text-green-600 font-bold text-lg">{tip.savings}</p>
                    <p className="text-sm text-gray-600">Potential monthly savings</p>
                  </div>
                  <Button 
                    className="bg-[#FFC220] hover:bg-[#FFB000] text-black font-semibold"
                  >
                    Switch Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Exclusive Drops */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🎁 Exclusive Drops
        </h2>
        {exclusiveDrops.map((drop) => (
          <Card key={drop.id} className="shadow-lg border-2 border-[#FFC220]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🌟</span>
                  <h3 className="font-bold text-xl text-[#0071CE]">{drop.title}</h3>
                </div>
                {drop.earlyAccess && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    Early Access
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <img 
                  src={drop.image} 
                  alt={drop.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-[#0071CE]">₹{drop.price}</span>
                    <span className="text-lg text-gray-500 line-through">₹{drop.originalPrice}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                      Save ₹{drop.originalPrice - drop.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">Limited time exclusive bundle</p>
                  <AddToCartButton 
                    product={{
                      id: drop.id,
                      name: drop.title,
                      price: drop.price,
                      image: drop.image
                    }}
                    className="bg-[#FFC220] hover:bg-[#FFB000] text-black font-semibold"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Walmart+ Membership Benefits */}
      <div className="px-6 mt-6 mb-6">
        <Card className="shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              ⭐ Walmart+ Benefits
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🚚</div>
                <p className="text-sm font-medium">Free Delivery</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-sm font-medium">Exclusive Deals</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <p className="text-sm font-medium">Priority Support</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <p className="text-sm font-medium">Extra Cashback</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            >
              Upgrade to Walmart+ Pro
            </Button>
          </CardContent>
        </Card>
      </div>

      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
    </div>
  );
};

export default AdvisorPage;