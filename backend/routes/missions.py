from fastapi import APIRouter, HTTPException
from typing import List
from ..models import LoyaltyMission, LoyaltyMissionCreate
from ..database import loyalty_missions_collection
import random

router = APIRouter(prefix="/missions", tags=["missions"])

@router.get("/", response_model=List[LoyaltyMission])
async def get_missions(active_only: bool = True):
    """Get all loyalty missions"""
    filter_query = {"active": True} if active_only else {}
    missions = await loyalty_missions_collection.find(filter_query).to_list(100)
    return [LoyaltyMission(**mission) for mission in missions]

@router.get("/{mission_id}", response_model=LoyaltyMission)
async def get_mission(mission_id: str):
    """Get mission by ID"""
    mission = await loyalty_missions_collection.find_one({"id": mission_id})
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    return LoyaltyMission(**mission)

@router.post("/", response_model=LoyaltyMission)
async def create_mission(mission_data: LoyaltyMissionCreate):
    """Create a new loyalty mission"""
    mission = LoyaltyMission(**mission_data.dict())
    await loyalty_missions_collection.insert_one(mission.dict())
    return mission

@router.put("/{mission_id}/progress")
async def update_mission_progress(mission_id: str, progress_increment: int = 1):
    """Update mission progress"""
    mission = await loyalty_missions_collection.find_one({"id": mission_id})
    if not mission:
        raise HTTPException(status_code=404, detail="Mission not found")
    
    new_progress = min(mission["progress"] + progress_increment, mission["target"])
    
    await loyalty_missions_collection.update_one(
        {"id": mission_id},
        {"$set": {"progress": new_progress}}
    )
    
    return {"message": "Mission progress updated", "new_progress": new_progress}

@router.post("/roulette/spin")
async def spin_roulette(user_id: str):
    """Spin the loyalty roulette wheel"""
    # Check if user has unlocked spin (cart value > 500)
    # For now, we'll simulate this
    
    rewards = [
        "10% Off Next Order",
        "Free Delivery", 
        "₹50 Cashback",
        "2x Points",
        "₹100 Off ₹500",
        "Free Sample Box",
        "Weekend Special",
        "Spin Again!"
    ]
    
    # Randomly select a reward
    selected_reward = random.choice(rewards)
    
    return {
        "reward": selected_reward,
        "message": f"Congratulations! You won: {selected_reward}"
    }

@router.get("/user/{user_id}/progress")
async def get_user_mission_progress(user_id: str):
    """Get user's mission progress (mock implementation)"""
    # In a real app, this would track user-specific progress
    missions = await loyalty_missions_collection.find({"active": True}).to_list(100)
    
    # Add mock user-specific progress
    for mission in missions:
        if mission["mission_type"] == "categories":
            mission["user_progress"] = 1  # User has bought from 1 category
        else:
            mission["user_progress"] = 0
    
    return {"missions": missions, "user_id": user_id}