import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import AddToCartButton from '../components/common/AddToCartButton';
import { mealPlans } from '../data/mockData';
import { useCart } from '../context/CartContext';
import CartModal from '../components/common/CartModal';

const PlannerPage = () => {
  const { cart, addToCart } = useCart();
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('Weight Loss');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const goals = Object.keys(mealPlans);
  const currentPlan = mealPlans[selectedGoal];

  const addAllIngredients = () => {
    // Mock ingredients for the meal plan
    const ingredients = [
      { id: 'ing-1', name: 'Oats - 1kg', price: 120 },
      { id: 'ing-2', name: 'Chicken Breast - 500g', price: 250 },
      { id: 'ing-3', name: 'Green Tea - 25 bags', price: 80 },
      { id: 'ing-4', name: 'Mixed Vegetables - 1kg', price: 150 },
      { id: 'ing-5', name: 'Quinoa - 500g', price: 200 }
    ];

    ingredients.forEach(ingredient => {
      addToCart(ingredient);
    });

    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0071CE] text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">🍽️ Plan Meals, Shop Smartly</h1>
            <p className="text-blue-100">AI-powered meal planning made easy</p>
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

      {/* Goal Selector */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🎯 Choose Your Goal
        </h2>
        <Tabs value={selectedGoal} onValueChange={setSelectedGoal} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {goals.map((goal) => (
              <TabsTrigger key={goal} value={goal} className="text-sm">
                {goal}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Weekly Meal Plan Display */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          📋 Your Weekly Plan
        </h2>
        
        {/* Plan Summary Card */}
        <Card className="mb-4 shadow-lg border-l-4 border-[#0071CE]">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#0071CE]">{selectedGoal} Plan</h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">₹{currentPlan.cost}</div>
                <div className="text-sm text-gray-600">{currentPlan.calories} cal/day</div>
              </div>
            </div>
            <Button 
              onClick={addAllIngredients}
              className="w-full bg-[#FFC220] hover:bg-[#FFB000] text-black font-semibold"
            >
              ✅ Add All Ingredients to Cart
            </Button>
          </CardContent>
        </Card>

        {/* Daily Meal Cards */}
        <div className="space-y-4">
          {Object.entries(currentPlan).map(([day, meals]) => {
            if (day === 'cost' || day === 'calories') return null;
            
            return (
              <Card key={day} className="shadow-md hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-3 capitalize text-[#0071CE] flex items-center">
                    📅 {day}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {meals.map((meal, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">
                            {index === 0 ? '🌅' : index === 1 ? '☀️' : '🌙'}
                          </span>
                          <div>
                            <span className="font-medium">{meal}</span>
                            <p className="text-sm text-gray-600">
                              {index === 0 ? 'Breakfast' : index === 1 ? 'Lunch' : 'Dinner'}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="text-xs border-[#0071CE] text-[#0071CE] hover:bg-blue-50"
                        >
                          Recipe
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Nutrition Tips */}
      <div className="px-6 mt-8">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-3 text-green-800 flex items-center">
              💡 Smart Tips for {selectedGoal}
            </h3>
            <div className="space-y-2">
              {selectedGoal === 'Weight Loss' && (
                <>
                  <p className="text-sm text-green-700">• Drink water before meals</p>
                  <p className="text-sm text-green-700">• Include protein in every meal</p>
                  <p className="text-sm text-green-700">• Avoid late night snacking</p>
                </>
              )}
              {selectedGoal === 'Family Dinners' && (
                <>
                  <p className="text-sm text-green-700">• Cook in larger batches</p>
                  <p className="text-sm text-green-700">• Include variety for kids</p>
                  <p className="text-sm text-green-700">• Prep ingredients in advance</p>
                </>
              )}
              {selectedGoal === 'High Protein' && (
                <>
                  <p className="text-sm text-green-700">• Eat protein within 30 minutes of workout</p>
                  <p className="text-sm text-green-700">• Include lean meats and legumes</p>
                  <p className="text-sm text-green-700">• Stay hydrated throughout the day</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-green-600 mb-2">Success!</h2>
              <p className="text-gray-700">All ingredients added to your cart</p>
            </CardContent>
          </Card>
        </div>
      )}

      <CartModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)} />
    </div>
  );
};

export default PlannerPage;