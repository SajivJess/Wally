from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
users_collection = db.users
products_collection = db.products
bundles_collection = db.bundles
cart_items_collection = db.cart_items
loyalty_missions_collection = db.loyalty_missions
meal_plans_collection = db.meal_plans
refill_alerts_collection = db.refill_alerts
smart_tips_collection = db.smart_tips

async def init_sample_data():
    """Initialize the database with sample data"""
    
    # Check if data already exists
    if await products_collection.count_documents({}) > 0:
        return
    
    # Sample Products
    sample_products = [
        {
            "id": "prod-1",
            "name": "Masala Maggi",
            "price": 120,
            "original_price": 150,
            "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=150&fit=crop",
            "category": "food",
            "description": "Delicious instant noodles"
        },
        {
            "id": "prod-2", 
            "name": "Bluetooth Neckband",
            "price": 799,
            "original_price": 999,
            "image": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=150&fit=crop",
            "category": "electronics",
            "description": "High quality wireless neckband"
        },
        {
            "id": "prod-3",
            "name": "Organic Face Wash", 
            "price": 299,
            "original_price": 349,
            "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=150&fit=crop",
            "category": "beauty",
            "description": "Natural organic face wash"
        }
    ]
    
    # Sample Bundles
    sample_bundles = [
        {
            "id": "bundle-1",
            "name": "Healthy Breakfast Pack",
            "price": 399,
            "original_price": 459,
            "savings": 60,
            "items_count": 5,
            "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=200&fit=crop",
            "product_ids": ["prod-1", "prod-3"]
        },
        {
            "id": "bundle-2",
            "name": "Rainy Day Essentials", 
            "price": 599,
            "original_price": 699,
            "savings": 100,
            "items_count": 7,
            "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
            "product_ids": ["prod-2", "prod-3"]
        },
        {
            "id": "bundle-3",
            "name": "Back-to-College Kit",
            "price": 899, 
            "original_price": 1099,
            "savings": 200,
            "items_count": 8,
            "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
            "product_ids": ["prod-1", "prod-2"]
        }
    ]
    
    # Sample User
    sample_user = {
        "id": "user-1",
        "name": "Raj",
        "location": "Chennai", 
        "points": 2450,
        "savings_this_month": 1320
    }
    
    # Sample Loyalty Missions
    sample_missions = [
        {
            "id": "mission-1",
            "title": "Buy 2 new snacks",
            "reward": "+100 points",
            "progress": 0,
            "target": 2,
            "mission_type": "snacks",
            "active": True
        },
        {
            "id": "mission-2",
            "title": "Try 1 new brand", 
            "reward": "Cashback unlocked",
            "progress": 0,
            "target": 1,
            "mission_type": "brands",
            "active": True
        },
        {
            "id": "mission-3",
            "title": "Buy from 3 different categories",
            "reward": "Spin unlocked", 
            "progress": 1,
            "target": 3,
            "mission_type": "categories",
            "active": True
        }
    ]
    
    # Sample Meal Plans
    sample_meal_plans = [
        {
            "id": "meal-1",
            "goal_type": "Weight Loss",
            "monday": ["Oats", "Grilled Chicken Salad", "Green Tea"],
            "tuesday": ["Smoothie Bowl", "Quinoa Bowl", "Herbal Tea"],
            "wednesday": ["Avocado Toast", "Fish Curry", "Lemon Water"],
            "thursday": ["Protein Shake", "Veggie Wrap", "Green Tea"],
            "friday": ["Greek Yogurt", "Chicken Breast", "Herbal Tea"],
            "saturday": ["Oatmeal", "Tuna Salad", "Green Tea"],
            "sunday": ["Smoothie", "Grilled Fish", "Lemon Water"],
            "estimated_cost": 450,
            "calories_per_day": 1200
        },
        {
            "id": "meal-2", 
            "goal_type": "Family Dinners",
            "monday": ["Pancakes", "Veg Biryani", "Milk"],
            "tuesday": ["Poha", "Dal Chawal", "Lassi"],
            "wednesday": ["Sandwich", "Chicken Curry", "Chai"],
            "thursday": ["Paratha", "Mixed Vegetables", "Milk"],
            "friday": ["Dosa", "Sambar Rice", "Buttermilk"],
            "saturday": ["Idli", "Chole Bhature", "Lassi"],
            "sunday": ["Upma", "Biryani", "Chai"],
            "estimated_cost": 680,
            "calories_per_day": 1800
        },
        {
            "id": "meal-3",
            "goal_type": "High Protein",
            "monday": ["Protein Shake", "Grilled Fish", "Nuts"],
            "tuesday": ["Egg Sandwich", "Chicken Breast", "Protein Bar"],
            "wednesday": ["Greek Yogurt", "Lentil Curry", "Almonds"],
            "thursday": ["Protein Smoothie", "Tofu Stir Fry", "Protein Bar"],
            "friday": ["Egg Omelette", "Fish Curry", "Mixed Nuts"],
            "saturday": ["Protein Pancakes", "Chicken Salad", "Protein Shake"],
            "sunday": ["Greek Yogurt", "Grilled Chicken", "Almonds"],
            "estimated_cost": 520,
            "calories_per_day": 1600
        }
    ]
    
    # Sample Smart Tips
    sample_smart_tips = [
        {
            "id": "tip-1",
            "title": "Switch to Walmart brand detergent",
            "savings": "₹75/month",
            "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop",
            "active": True
        },
        {
            "id": "tip-2",
            "title": "Buy groceries in bulk",
            "savings": "₹120/month",
            "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=150&fit=crop", 
            "active": True
        }
    ]
    
    # Insert sample data
    await products_collection.insert_many(sample_products)
    await bundles_collection.insert_many(sample_bundles)
    await users_collection.insert_one(sample_user)
    await loyalty_missions_collection.insert_many(sample_missions)
    await meal_plans_collection.insert_many(sample_meal_plans)
    await smart_tips_collection.insert_many(sample_smart_tips)
    
    print("✅ Sample data initialized successfully")