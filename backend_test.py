#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Walmart SmartCommerce+
Tests all API endpoints with detailed validation
"""

import requests
import json
import sys
from typing import Dict, Any
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE = f"{BACKEND_URL}/api"

class WalmartAPITester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        self.sample_user_id = "user-1"  # Our sample user "Raj"
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "response_data": response_data
        }
        self.test_results.append(result)
        if not success:
            self.failed_tests.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    {details}")
        if not success and response_data:
            print(f"    Response: {response_data}")
        print()

    def test_api_health(self):
        """Test API health endpoints"""
        print("=== Testing API Health ===")
        
        # Test root endpoint
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_test("GET /api/", True, f"Status: {response.status_code}, Message: {data.get('message', '')}")
            else:
                self.log_test("GET /api/", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/", False, f"Connection error: {str(e)}")

        # Test health endpoint
        try:
            response = requests.get(f"{API_BASE}/health", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_test("GET /api/health", True, f"Status: {response.status_code}, Service: {data.get('service', '')}")
            else:
                self.log_test("GET /api/health", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/health", False, f"Connection error: {str(e)}")

    def test_user_management(self):
        """Test user management endpoints"""
        print("=== Testing User Management ===")
        
        # Test get user profile for sample user "Raj"
        try:
            response = requests.get(f"{API_BASE}/users/{self.sample_user_id}", timeout=10)
            if response.status_code == 200:
                user_data = response.json()
                self.log_test("GET /api/users/user-1", True, 
                            f"User: {user_data.get('name', '')}, Location: {user_data.get('location', '')}, Points: {user_data.get('points', 0)}")
            else:
                self.log_test("GET /api/users/user-1", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/users/user-1", False, f"Error: {str(e)}")

        # Test get user profile with cart and missions
        try:
            response = requests.get(f"{API_BASE}/users/{self.sample_user_id}/profile", timeout=10)
            if response.status_code == 200:
                profile_data = response.json()
                cart_summary = profile_data.get('cart_summary', {})
                missions = profile_data.get('active_missions', [])
                self.log_test("GET /api/users/user-1/profile", True, 
                            f"Cart items: {cart_summary.get('total_items', 0)}, Active missions: {len(missions)}")
            else:
                self.log_test("GET /api/users/user-1/profile", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/users/user-1/profile", False, f"Error: {str(e)}")

    def test_products_and_bundles(self):
        """Test products and bundles endpoints"""
        print("=== Testing Products & Bundles ===")
        
        # Test get all products
        try:
            response = requests.get(f"{API_BASE}/products/", timeout=10)
            if response.status_code == 200:
                products = response.json()
                self.log_test("GET /api/products/", True, f"Found {len(products)} products")
            else:
                self.log_test("GET /api/products/", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/products/", False, f"Error: {str(e)}")

        # Test get products by category
        categories = ["food", "electronics", "beauty"]
        for category in categories:
            try:
                response = requests.get(f"{API_BASE}/products/?category={category}", timeout=10)
                if response.status_code == 200:
                    products = response.json()
                    self.log_test(f"GET /api/products/?category={category}", True, f"Found {len(products)} {category} products")
                else:
                    self.log_test(f"GET /api/products/?category={category}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_test(f"GET /api/products/?category={category}", False, f"Error: {str(e)}")

        # Test trending products for Chennai
        try:
            response = requests.get(f"{API_BASE}/products/trending/location?location=Chennai", timeout=10)
            if response.status_code == 200:
                trending = response.json()
                self.log_test("GET /api/products/trending/location", True, f"Found {len(trending)} trending products for Chennai")
            else:
                self.log_test("GET /api/products/trending/location", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/products/trending/location", False, f"Error: {str(e)}")

        # Test get all bundles
        try:
            response = requests.get(f"{API_BASE}/products/bundles/", timeout=10)
            if response.status_code == 200:
                bundles = response.json()
                self.log_test("GET /api/products/bundles/", True, f"Found {len(bundles)} smart bundles")
            else:
                self.log_test("GET /api/products/bundles/", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/products/bundles/", False, f"Error: {str(e)}")

        # Test get individual bundle by ID
        try:
            response = requests.get(f"{API_BASE}/products/bundles/bundle-1", timeout=10)
            if response.status_code == 200:
                bundle = response.json()
                self.log_test("GET /api/products/bundles/bundle-1", True, 
                            f"Bundle: {bundle.get('name', '')}, Price: ₹{bundle.get('price', 0)}, Savings: ₹{bundle.get('savings', 0)}")
            else:
                self.log_test("GET /api/products/bundles/bundle-1", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/products/bundles/bundle-1", False, f"Error: {str(e)}")

    def test_cart_operations(self):
        """Test cart operations"""
        print("=== Testing Cart Operations ===")
        
        # Clear cart first
        try:
            requests.delete(f"{API_BASE}/cart/{self.sample_user_id}/clear", timeout=10)
        except:
            pass

        # Test get empty cart
        try:
            response = requests.get(f"{API_BASE}/cart/{self.sample_user_id}", timeout=10)
            if response.status_code == 200:
                cart = response.json()
                self.log_test("GET /api/cart/user-1 (empty)", True, 
                            f"Items: {cart.get('total_items', 0)}, Amount: ₹{cart.get('total_amount', 0)}")
            else:
                self.log_test("GET /api/cart/user-1 (empty)", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/cart/user-1 (empty)", False, f"Error: {str(e)}")

        # Test add items to cart
        cart_items = [
            {
                "user_id": self.sample_user_id,
                "product_id": "prod-1",
                "product_name": "Masala Maggi",
                "price": 120,
                "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=150&fit=crop",
                "quantity": 2
            },
            {
                "user_id": self.sample_user_id,
                "product_id": "prod-2",
                "product_name": "Bluetooth Neckband",
                "price": 799,
                "image": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=150&fit=crop",
                "quantity": 1
            }
        ]

        added_item_ids = []
        for item in cart_items:
            try:
                response = requests.post(f"{API_BASE}/cart/{self.sample_user_id}/items", 
                                       json=item, timeout=10)
                if response.status_code == 200:
                    added_item = response.json()
                    added_item_ids.append(added_item.get('id'))
                    self.log_test(f"POST /api/cart/user-1/items ({item['product_name']})", True, 
                                f"Added {item['quantity']}x {item['product_name']}")
                else:
                    self.log_test(f"POST /api/cart/user-1/items ({item['product_name']})", False, 
                                f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_test(f"POST /api/cart/user-1/items ({item['product_name']})", False, f"Error: {str(e)}")

        # Test get cart with items
        try:
            response = requests.get(f"{API_BASE}/cart/{self.sample_user_id}", timeout=10)
            if response.status_code == 200:
                cart = response.json()
                self.log_test("GET /api/cart/user-1 (with items)", True, 
                            f"Items: {cart.get('total_items', 0)}, Amount: ₹{cart.get('total_amount', 0)}")
            else:
                self.log_test("GET /api/cart/user-1 (with items)", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/cart/user-1 (with items)", False, f"Error: {str(e)}")

        # Test update cart item quantity
        if added_item_ids:
            try:
                update_data = {"quantity": 3}
                response = requests.put(f"{API_BASE}/cart/{self.sample_user_id}/items/{added_item_ids[0]}", 
                                      json=update_data, timeout=10)
                if response.status_code == 200:
                    self.log_test("PUT /api/cart/user-1/items/{item_id}", True, "Updated item quantity to 3")
                else:
                    self.log_test("PUT /api/cart/user-1/items/{item_id}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("PUT /api/cart/user-1/items/{item_id}", False, f"Error: {str(e)}")

        # Test remove item from cart
        if len(added_item_ids) > 1:
            try:
                response = requests.delete(f"{API_BASE}/cart/{self.sample_user_id}/items/{added_item_ids[1]}", timeout=10)
                if response.status_code == 200:
                    self.log_test("DELETE /api/cart/user-1/items/{item_id}", True, "Removed item from cart")
                else:
                    self.log_test("DELETE /api/cart/user-1/items/{item_id}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("DELETE /api/cart/user-1/items/{item_id}", False, f"Error: {str(e)}")

    def test_loyalty_missions(self):
        """Test loyalty missions endpoints"""
        print("=== Testing Loyalty Missions ===")
        
        # Test get all active missions
        try:
            response = requests.get(f"{API_BASE}/missions/", timeout=10)
            if response.status_code == 200:
                missions = response.json()
                self.log_test("GET /api/missions/", True, f"Found {len(missions)} active missions")
            else:
                self.log_test("GET /api/missions/", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/missions/", False, f"Error: {str(e)}")

        # Test update mission progress
        try:
            response = requests.put(f"{API_BASE}/missions/mission-1/progress?progress_increment=1", timeout=10)
            if response.status_code == 200:
                result = response.json()
                self.log_test("PUT /api/missions/mission-1/progress", True, 
                            f"Updated progress to {result.get('new_progress', 0)}")
            else:
                self.log_test("PUT /api/missions/mission-1/progress", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("PUT /api/missions/mission-1/progress", False, f"Error: {str(e)}")

        # Test roulette spin
        try:
            response = requests.post(f"{API_BASE}/missions/roulette/spin?user_id={self.sample_user_id}", timeout=10)
            if response.status_code == 200:
                result = response.json()
                self.log_test("POST /api/missions/roulette/spin", True, 
                            f"Reward: {result.get('reward', '')}")
            else:
                self.log_test("POST /api/missions/roulette/spin", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("POST /api/missions/roulette/spin", False, f"Error: {str(e)}")

    def test_meal_planning(self):
        """Test meal planning endpoints"""
        print("=== Testing Meal Planning ===")
        
        # Test get all meal plans
        try:
            response = requests.get(f"{API_BASE}/meal-plans/", timeout=10)
            if response.status_code == 200:
                meal_plans = response.json()
                self.log_test("GET /api/meal-plans/", True, f"Found {len(meal_plans)} meal plans")
            else:
                self.log_test("GET /api/meal-plans/", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/meal-plans/", False, f"Error: {str(e)}")

        # Test meal plans by goal type
        goals = ["Weight Loss", "Family Dinners", "High Protein"]
        for goal in goals:
            try:
                response = requests.get(f"{API_BASE}/meal-plans/?goal_type={goal}", timeout=10)
                if response.status_code == 200:
                    plans = response.json()
                    self.log_test(f"GET /api/meal-plans/?goal_type={goal}", True, 
                                f"Found {len(plans)} plans for {goal}")
                else:
                    self.log_test(f"GET /api/meal-plans/?goal_type={goal}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_test(f"GET /api/meal-plans/?goal_type={goal}", False, f"Error: {str(e)}")

        # Test meal plan ingredients
        for goal in goals:
            try:
                response = requests.get(f"{API_BASE}/meal-plans/ingredients/{goal}", timeout=10)
                if response.status_code == 200:
                    ingredients = response.json()
                    self.log_test(f"GET /api/meal-plans/ingredients/{goal}", True, 
                                f"Found {len(ingredients.get('ingredients', []))} ingredients, Total cost: ₹{ingredients.get('total_cost', 0)}")
                else:
                    self.log_test(f"GET /api/meal-plans/ingredients/{goal}", False, f"Status: {response.status_code}", response.text)
            except Exception as e:
                self.log_test(f"GET /api/meal-plans/ingredients/{goal}", False, f"Error: {str(e)}")

    def test_recommendations(self):
        """Test recommendations endpoints"""
        print("=== Testing Recommendations ===")
        
        # Test get smart tips
        try:
            response = requests.get(f"{API_BASE}/recommendations/smart-tips", timeout=10)
            if response.status_code == 200:
                tips = response.json()
                self.log_test("GET /api/recommendations/smart-tips", True, f"Found {len(tips)} smart tips")
            else:
                self.log_test("GET /api/recommendations/smart-tips", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/recommendations/smart-tips", False, f"Error: {str(e)}")

        # Test get refill alerts
        try:
            response = requests.get(f"{API_BASE}/recommendations/refill-alerts/{self.sample_user_id}", timeout=10)
            if response.status_code == 200:
                alerts = response.json()
                self.log_test("GET /api/recommendations/refill-alerts/user-1", True, f"Found {len(alerts)} refill alerts")
            else:
                self.log_test("GET /api/recommendations/refill-alerts/user-1", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/recommendations/refill-alerts/user-1", False, f"Error: {str(e)}")

        # Test get exclusive drops
        try:
            response = requests.get(f"{API_BASE}/recommendations/exclusive-drops?user_id={self.sample_user_id}", timeout=10)
            if response.status_code == 200:
                drops = response.json()
                self.log_test("GET /api/recommendations/exclusive-drops", True, 
                            f"Found {len(drops.get('drops', []))} exclusive drops")
            else:
                self.log_test("GET /api/recommendations/exclusive-drops", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/recommendations/exclusive-drops", False, f"Error: {str(e)}")

        # Test personalized recommendations
        try:
            response = requests.get(f"{API_BASE}/recommendations/personalized/{self.sample_user_id}", timeout=10)
            if response.status_code == 200:
                recommendations = response.json()
                recs = recommendations.get('recommendations', {})
                self.log_test("GET /api/recommendations/personalized/user-1", True, 
                            f"Top products: {len(recs.get('top_products', []))}, Switches: {len(recs.get('suggested_switches', []))}")
            else:
                self.log_test("GET /api/recommendations/personalized/user-1", False, f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/recommendations/personalized/user-1", False, f"Error: {str(e)}")

    def test_error_handling(self):
        """Test error handling for non-existent resources"""
        print("=== Testing Error Handling ===")
        
        # Test non-existent user
        try:
            response = requests.get(f"{API_BASE}/users/non-existent-user", timeout=10)
            if response.status_code == 404:
                self.log_test("GET /api/users/non-existent-user", True, "Correctly returned 404 for non-existent user")
            else:
                self.log_test("GET /api/users/non-existent-user", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/users/non-existent-user", False, f"Error: {str(e)}")

        # Test non-existent product
        try:
            response = requests.get(f"{API_BASE}/products/non-existent-product", timeout=10)
            if response.status_code == 404:
                self.log_test("GET /api/products/non-existent-product", True, "Correctly returned 404 for non-existent product")
            else:
                self.log_test("GET /api/products/non-existent-product", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/products/non-existent-product", False, f"Error: {str(e)}")

        # Test non-existent bundle
        try:
            response = requests.get(f"{API_BASE}/products/bundles/non-existent-bundle", timeout=10)
            if response.status_code == 404:
                self.log_test("GET /api/products/bundles/non-existent-bundle", True, "Correctly returned 404 for non-existent bundle")
            else:
                self.log_test("GET /api/products/bundles/non-existent-bundle", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/products/bundles/non-existent-bundle", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run all tests"""
        print(f"🚀 Starting Walmart SmartCommerce+ Backend API Tests")
        print(f"📍 Testing against: {API_BASE}")
        print("=" * 60)
        
        self.test_api_health()
        self.test_user_management()
        self.test_products_and_bundles()
        self.test_cart_operations()
        self.test_loyalty_missions()
        self.test_meal_planning()
        self.test_recommendations()
        self.test_error_handling()
        
        # Print summary
        print("=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['details']}")
        else:
            print("\n🎉 ALL TESTS PASSED!")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = WalmartAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)