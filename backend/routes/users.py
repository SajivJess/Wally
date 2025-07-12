from fastapi import APIRouter, HTTPException
from typing import List
from models import User, UserCreate, UserProfile, CartSummary
from database import users_collection, cart_items_collection, loyalty_missions_collection

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/{user_id}", response_model=User)
async def get_user(user_id: str):
    """Get user by ID"""
    user = await users_collection.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)

@router.post("/", response_model=User)
async def create_user(user_data: UserCreate):
    """Create a new user"""
    user = User(**user_data.dict())
    await users_collection.insert_one(user.dict())
    return user

@router.get("/{user_id}/profile", response_model=UserProfile)
async def get_user_profile(user_id: str):
    """Get complete user profile with cart and missions"""
    # Get user
    user = await users_collection.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get cart items
    cart_items = await cart_items_collection.find({"user_id": user_id}).to_list(100)
    total_items = sum(item["quantity"] for item in cart_items)
    total_amount = sum(item["price"] * item["quantity"] for item in cart_items)
    
    cart_summary = CartSummary(
        items=cart_items,
        total_items=total_items,
        total_amount=total_amount
    )
    
    # Get active missions
    missions = await loyalty_missions_collection.find({"active": True}).to_list(10)
    
    return UserProfile(
        user=User(**user),
        cart_summary=cart_summary,
        active_missions=missions
    )

@router.put("/{user_id}/points")
async def update_user_points(user_id: str, points: int):
    """Update user points"""
    result = await users_collection.update_one(
        {"id": user_id},
        {"$inc": {"points": points}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "Points updated successfully"}