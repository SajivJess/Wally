import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/missions', icon: '🎯', label: 'Missions' },
    { path: '/planner', icon: '🍽️', label: 'Planner' },
    { path: '/camera', icon: '📷', label: 'Camera' },
    { path: '/smartcart', icon: '🛒', label: 'SmartCart' },
    { path: '/advisor', icon: '👤', label: 'Walmart+' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 relative ${
              location.pathname === item.path
                ? 'text-[#0071CE] bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-lg mb-1">{item.icon}</span>
            {item.path === '/smartcart' && cart.totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {cart.totalItems}
              </span>
            )}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;