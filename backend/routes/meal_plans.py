from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models import MealPlan, MealPlanCreate
from ..database import meal_plans_collection

router = APIRouter(prefix="/meal-plans", tags=["meal-plans"])

@router.get("/", response_model=List[MealPlan])
async def get_meal_plans(goal_type: Optional[str] = Query(None, description="Filter by goal type")):
    """Get all meal plans with optional goal filter"""
    filter_query = {}
    if goal_type:
        filter_query["goal_type"] = goal_type
    
    meal_plans = await meal_plans_collection.find(filter_query).to_list(100)
    return [MealPlan(**plan) for plan in meal_plans]

@router.get("/{plan_id}", response_model=MealPlan)
async def get_meal_plan(plan_id: str):
    """Get meal plan by ID"""
    meal_plan = await meal_plans_collection.find_one({"id": plan_id})
    if not meal_plan:
        raise HTTPException(status_code=404, detail="Meal plan not found")
    return MealPlan(**meal_plan)

@router.get("/goal/{goal_type}", response_model=MealPlan)
async def get_meal_plan_by_goal(goal_type: str):
    """Get meal plan by goal type"""
    meal_plan = await meal_plans_collection.find_one({"goal_type": goal_type})
    if not meal_plan:
        raise HTTPException(status_code=404, detail=f"Meal plan for {goal_type} not found")
    return MealPlan(**meal_plan)

@router.post("/", response_model=MealPlan)
async def create_meal_plan(plan_data: MealPlanCreate):
    """Create a new meal plan"""
    meal_plan = MealPlan(**plan_data.dict())
    await meal_plans_collection.insert_one(meal_plan.dict())
    return meal_plan

@router.get("/ingredients/{goal_type}")
async def get_meal_plan_ingredients(goal_type: str):
    """Get shopping list for meal plan ingredients"""
    meal_plan = await meal_plans_collection.find_one({"goal_type": goal_type})
    if not meal_plan:
        raise HTTPException(status_code=404, detail=f"Meal plan for {goal_type} not found")
    
    # Mock ingredients based on goal type
    ingredients_map = {
        "Weight Loss": [
            {"id": "ing-1", "name": "Oats - 1kg", "price": 120, "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop"},
            {"id": "ing-2", "name": "Chicken Breast - 500g", "price": 250, "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=200&h=150&fit=crop"},
            {"id": "ing-3", "name": "Green Tea - 25 bags", "price": 80, "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=150&fit=crop"},
            {"id": "ing-4", "name": "Mixed Vegetables - 1kg", "price": 150, "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=150&fit=crop"},
            {"id": "ing-5", "name": "Quinoa - 500g", "price": 200, "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=150&fit=crop"}
        ],
        "Family Dinners": [
            {"id": "ing-6", "name": "Basmati Rice - 5kg", "price": 400, "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=150&fit=crop"},
            {"id": "ing-7", "name": "Dal Mix - 1kg", "price": 180, "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop"},
            {"id": "ing-8", "name": "Whole Wheat Flour - 5kg", "price": 220, "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=200&h=150&fit=crop"},
            {"id": "ing-9", "name": "Chicken - 1kg", "price": 300, "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=150&fit=crop"},
            {"id": "ing-10", "name": "Dairy Milk - 1L", "price": 60, "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=150&fit=crop"}
        ],
        "High Protein": [
            {"id": "ing-11", "name": "Protein Powder - 1kg", "price": 2500, "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop"},
            {"id": "ing-12", "name": "Greek Yogurt - 500g", "price": 180, "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=150&fit=crop"},
            {"id": "ing-13", "name": "Almonds - 500g", "price": 450, "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=200&h=150&fit=crop"},
            {"id": "ing-14", "name": "Fish Fillet - 500g", "price": 400, "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=150&fit=crop"},
            {"id": "ing-15", "name": "Eggs - 12 pieces", "price": 80, "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=150&fit=crop"}
        ]
    }
    
    ingredients = ingredients_map.get(goal_type, [])
    total_cost = sum(item["price"] for item in ingredients)
    
    return {
        "goal_type": goal_type,
        "ingredients": ingredients,
        "total_cost": total_cost,
        "estimated_servings": 7  # 7 days
    }

@router.get("/goals/available")
async def get_available_goals():
    """Get list of available meal plan goals"""
    goals = await meal_plans_collection.distinct("goal_type")
    return {"goals": goals}