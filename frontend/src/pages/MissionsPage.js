import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { mockUser, loyaltyMissions, rouletteRewards } from '../data/mockData';
import { useCart } from '../context/CartContext';
import CartModal from '../components/common/CartModal';

const MissionsPage = () => {
  const { cart } = useCart();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [rotation, setRotation] = useState(0);

  const canSpin = cart.totalAmount >= 500; // Unlock spin after ₹500 cart value

  const handleSpin = () => {
    if (!canSpin || spinning) return;
    
    setSpinning(true);
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const finalRotation = rotation + (spins * 360) + (Math.random() * 360);
    setRotation(finalRotation);
    
    setTimeout(() => {
      const rewardIndex = Math.floor(Math.random() * rouletteRewards.length);
      setSpinResult(rouletteRewards[rewardIndex]);
      setSpinning(false);
    }, 3000);
  };

  const closeSpinResult = () => {
    setSpinResult(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0071CE] text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">🎯 Your Missions This Week</h1>
            <p className="text-blue-100">Complete missions to earn rewards!</p>
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
        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">Your Points</span>
            <span className="text-2xl font-bold text-[#FFC220]">{mockUser.points}</span>
          </div>
        </div>
      </div>

      {/* Loyalty Missions Panel */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🎮 Loyalty Missions
        </h2>
        <div className="space-y-4">
          {loyaltyMissions.map((mission) => (
            <Card key={mission.id} className="shadow-md hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{mission.title}</h3>
                    <p className="text-[#0071CE] font-medium">{mission.reward}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">
                      {mission.progress}/{mission.target}
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <Progress 
                    value={(mission.progress / mission.target) * 100}
                    className="h-3"
                  />
                </div>
                {mission.progress >= mission.target ? (
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    ✓ Completed!
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    className="w-full border-[#0071CE] text-[#0071CE] hover:bg-blue-50"
                  >
                    In Progress...
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Walmart Roulette Wheel */}
      <div className="px-6 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🎰 Walmart Roulette
        </h2>
        <Card className="shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="relative w-64 h-64 mx-auto mb-6">
              {/* Roulette Wheel */}
              <div 
                className={`w-full h-full rounded-full border-8 border-[#0071CE] relative transition-transform duration-3000 ease-out ${spinning ? 'animate-spin' : ''}`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {/* Wheel segments */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#0071CE] to-[#FFC220] flex items-center justify-center">
                  <div className="text-white font-bold text-lg">SPIN</div>
                </div>
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
                </div>
              </div>
            </div>
            
            {canSpin ? (
              <div>
                <p className="text-green-600 mb-4 font-semibold">🎉 Spin Unlocked!</p>
                <Button 
                  onClick={handleSpin}
                  disabled={spinning}
                  className="bg-[#FFC220] hover:bg-[#FFB000] text-black font-bold text-lg px-8 py-3"
                >
                  {spinning ? 'Spinning...' : 'Spin Now!'}
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">Add ₹{500 - cart.totalAmount} more to cart to unlock spin!</p>
                <div className="bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-[#0071CE] h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((cart.totalAmount / 500) * 100, 100)}%` }}
                  ></div>
                </div>
                <Button 
                  disabled
                  className="bg-gray-300 text-gray-500 cursor-not-allowed"
                >
                  Spin Locked
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Spin Result Modal */}
      {spinResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-xl font-bold text-[#0071CE] mb-2">Congratulations!</h2>
              <p className="text-lg mb-4">You won:</p>
              <div className="bg-[#FFC220] text-black p-4 rounded-lg mb-4">
                <span className="text-xl font-bold">{spinResult}</span>
              </div>
              <Button 
                onClick={closeSpinResult}
                className="w-full bg-[#0071CE] hover:bg-blue-700"
              >
                Claim Reward
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
    </div>
  );
};

export default MissionsPage;