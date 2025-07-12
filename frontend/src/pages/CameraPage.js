import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import AddToCartButton from '../components/common/AddToCartButton';
import { refillAlerts } from '../data/mockData';
import { useCart } from '../context/CartContext';
import CartModal from '../components/common/CartModal';

const CameraPage = () => {
  const { cart } = useCart();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        performSearch();
      };
      reader.readAsDataURL(file);
    }
  };

  const performSearch = () => {
    setIsSearching(true);
    // Simulate AI search with delay
    setTimeout(() => {
      setSearchResults([
        {
          id: 'match-1',
          name: 'Premium Notebook - 200 pages',
          price: 120,
          originalPrice: 150,
          match: '95%',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=150&fit=crop'
        },
        {
          id: 'match-2',
          name: 'Student Diary - Hardcover',
          price: 80,
          originalPrice: 100,
          match: '87%',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop'
        },
        {
          id: 'match-3',
          name: 'Office Planner - Weekly',
          price: 250,
          originalPrice: 300,
          match: '82%',
          image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&h=150&fit=crop'
        }
      ]);
      setIsSearching(false);
    }, 2000);
  };

  const clearSearch = () => {
    setUploadedImage(null);
    setSearchResults([]);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0071CE] text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">📷 Scan & Shop Smarter</h1>
            <p className="text-blue-100">Find products using AI visual search</p>
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

      {/* Camera Upload Section */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          📸 Visual Search
        </h2>
        
        <Card className="shadow-lg mb-6">
          <CardContent className="p-6">
            {!uploadedImage ? (
              <div className="text-center">
                <div className="border-2 border-dashed border-[#0071CE] rounded-xl p-8 bg-blue-50">
                  <div className="text-6xl mb-4">📷</div>
                  <h3 className="text-lg font-semibold mb-2">Snap or upload an item</h3>
                  <p className="text-gray-600 mb-4">Find similar products using AI</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block bg-[#0071CE] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Choose Image
                  </label>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded item"
                  className="w-48 h-48 object-cover rounded-lg mx-auto mb-4"
                />
                <div className="flex space-x-3 justify-center">
                  <Button 
                    onClick={clearSearch}
                    variant="outline"
                    className="border-gray-300"
                  >
                    Upload New
                  </Button>
                  <Button 
                    onClick={performSearch}
                    className="bg-[#0071CE] hover:bg-blue-700"
                  >
                    Search Again
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search Results */}
        {isSearching && (
          <Card className="shadow-md mb-6">
            <CardContent className="p-6 text-center">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-[#0071CE] rounded-full mb-4"></div>
              <p className="text-[#0071CE] font-medium">AI is finding similar products...</p>
            </CardContent>
          </Card>
        )}

        {searchResults.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              🎯 AI Matched Results
            </h3>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <Card key={result.id} className="shadow-md hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={result.image} 
                        alt={result.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{result.name}</h3>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                            {result.match} match
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-xl font-bold text-[#0071CE]">₹{result.price}</span>
                          <span className="text-sm text-gray-500 line-through">₹{result.originalPrice}</span>
                        </div>
                        <div className="flex space-x-2">
                          <AddToCartButton 
                            product={{
                              id: result.id,
                              name: result.name,
                              price: result.price,
                              image: result.image
                            }}
                            className="text-sm"
                          />
                          <Button 
                            variant="outline"
                            className="text-sm border-[#0071CE] text-[#0071CE] hover:bg-blue-50"
                          >
                            View Options
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Refill Alert Panel */}
      <div className="px-6 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🔁 Refill Alerts
        </h2>
        <div className="space-y-4">
          {refillAlerts.map((alert) => (
            <Card key={alert.id} className="shadow-md border-l-4 border-orange-400">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={alert.image} 
                    alt={alert.product}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Time to restock {alert.product}?</h3>
                    <p className="text-orange-600 font-medium mb-2">
                      Running low - Only {alert.daysLeft} days left
                    </p>
                    <div className="flex space-x-2">
                      <AddToCartButton 
                        product={{
                          id: alert.id,
                          name: alert.product,
                          price: 199, // Mock price
                          image: alert.image
                        }}
                        className="text-sm bg-orange-500 hover:bg-orange-600"
                      />
                      <span className="bg-[#FFC220] text-black px-3 py-1 rounded-full text-sm font-semibold">
                        {alert.discount}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
    </div>
  );
};

export default CameraPage;