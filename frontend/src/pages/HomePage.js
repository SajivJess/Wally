import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import AddToCartButton from '../components/common/AddToCartButton';
import { mockUser, smartBundles, trendingProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';
import CartModal from '../components/common/CartModal';

const HomePage = () => {
  const { cart } = useCart();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(null);

  const openBundleModal = (bundle) => {
    setSelectedBundle(bundle);
  };

  const closeBundleModal = () => {
    setSelectedBundle(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0071CE] text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              👋 Hi {mockUser.name}, Let's plan your week smartly.
            </h1>
            <p className="text-blue-100">Here are your Smart Picks.</p>
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

      {/* Smart AI Bundles Carousel */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🧠 Smart AI Bundles
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {smartBundles.map((bundle) => (
            <Card key={bundle.id} className="min-w-[280px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-4">
                <img 
                  src={bundle.image} 
                  alt={bundle.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-bold text-lg mb-2">{bundle.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-[#0071CE]">₹{bundle.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">₹{bundle.originalPrice}</span>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Save ₹{bundle.savings}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{bundle.items} items</p>
                <div className="flex space-x-2">
                  <AddToCartButton 
                    product={{
                      id: bundle.id,
                      name: bundle.name,
                      price: bundle.price,
                      image: bundle.image
                    }}
                    className="flex-1 text-sm"
                  />
                  <Button 
                    onClick={() => openBundleModal(bundle)}
                    variant="outline"
                    className="flex-1 text-sm border-[#0071CE] text-[#0071CE] hover:bg-blue-50"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending in Chennai */}
      <div className="px-6 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          📍 Trending in {mockUser.location}
        </h2>
        <div className="space-y-4">
          {trendingProducts.map((product) => (
            <Card key={product.id} className="shadow-md hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xl font-bold text-[#0071CE]">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      <span className="bg-[#FFC220] text-black px-2 py-1 rounded-full text-xs font-semibold">
                        {product.discount}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <AddToCartButton 
                        product={{
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image
                        }}
                        className="text-sm"
                      />
                      <Button 
                        variant="outline"
                        className="text-sm border-gray-300 hover:bg-gray-50"
                      >
                        More Info
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bundle Details Modal */}
      {selectedBundle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-[#0071CE]">{selectedBundle.name}</h2>
                <button 
                  onClick={closeBundleModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <img 
                src={selectedBundle.image} 
                alt={selectedBundle.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-[#0071CE]">₹{selectedBundle.price}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Save ₹{selectedBundle.savings}
                  </span>
                </div>
                <p className="text-gray-600">{selectedBundle.items} carefully selected items</p>
              </div>
              <AddToCartButton 
                product={{
                  id: selectedBundle.id,
                  name: selectedBundle.name,
                  price: selectedBundle.price,
                  image: selectedBundle.image
                }}
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>
      )}

      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
    </div>
  );
};

export default HomePage;