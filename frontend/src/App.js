import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "./components/ui/toaster";
import BottomNavigation from "./components/common/BottomNavigation";

// Import pages
import HomePage from "./pages/HomePage";
import MissionsPage from "./pages/MissionsPage";
import PlannerPage from "./pages/PlannerPage";
import CameraPage from "./pages/CameraPage";
import SmartCartPage from "./pages/SmartCartPage";
import AdvisorPage from "./pages/AdvisorPage";

function App() {
  return (
    <CartProvider>
      <div className="App bg-gray-50 min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/smartcart" element={<SmartCartPage />} />
            <Route path="/advisor" element={<AdvisorPage />} />
          </Routes>
          <BottomNavigation />
        </BrowserRouter>
        <Toaster />
      </div>
    </CartProvider>
  );
}

export default App;