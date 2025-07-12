from fastapi import APIRouter, Query
from typing import List
from models import SmartTip, SmartTipCreate, RefillAlert, RefillAlertCreate
from database import smart_tips_collection, refill_alerts_collection

router = APIRouter(prefix="/recommendations", tags=["recommendations"])

@router.get("/smart-tips", response_model=List[SmartTip])
async def get_smart_tips(active_only: bool = True):
    """Get all smart tips for users"""
    filter_query = {"active": True} if active_only else {}
    tips = await smart_tips_collection.find(filter_query).to_list(100)
    return [SmartTip(**tip) for tip in tips]

@router.post("/smart-tips", response_model=SmartTip)
async def create_smart_tip(tip_data: SmartTipCreate):
    """Create a new smart tip"""
    tip = SmartTip(**tip_data.dict())
    await smart_tips_collection.insert_one(tip.dict())
    return tip

@router.get("/refill-alerts/{user_id}", response_model=List[RefillAlert])
async def get_refill_alerts(user_id: str):
    """Get refill alerts for a user"""
    alerts = await refill_alerts_collection.find({"user_id": user_id, "active": True}).to_list(100)
    
    # If no user-specific alerts, return default alerts
    if not alerts:
        default_alerts = [
            {
                "id": "refill-1",
                "user_id": user_id,
                "product_name": "Baby Wipes",
                "days_left": 3,
                "discount": "₹20 Off",
                "image": "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=150&fit=crop",
                "active": True
            },
            {
                "id": "refill-2", 
                "user_id": user_id,
                "product_name": "Detergent Powder",
                "days_left": 5,
                "discount": "₹50 Off",
                "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop",
                "active": True
            }
        ]
        return [RefillAlert(**alert) for alert in default_alerts]
    
    return [RefillAlert(**alert) for alert in alerts]

@router.post("/refill-alerts", response_model=RefillAlert)
async def create_refill_alert(alert_data: RefillAlertCreate):
    """Create a new refill alert"""
    alert = RefillAlert(**alert_data.dict())
    await refill_alerts_collection.insert_one(alert.dict())
    return alert

@router.get("/exclusive-drops")
async def get_exclusive_drops(user_id: str = Query(..., description="User ID")):
    """Get exclusive drops for user"""
    # Mock exclusive drops
    drops = [
        {
            "id": "drop-1",
            "title": "Organic Wellness Bundle",
            "price": 899,
            "original_price": 1299,
            "early_access": True,
            "image": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=150&fit=crop",
            "description": "Limited time exclusive bundle with organic products"
        },
        {
            "id": "drop-2",
            "title": "Tech Essentials Pack",
            "price": 1599,
            "original_price": 2199,
            "early_access": True,
            "image": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=150&fit=crop",
            "description": "Latest tech accessories bundle"
        }
    ]
    return {"drops": drops, "user_id": user_id}

@router.get("/personalized/{user_id}")
async def get_personalized_recommendations(user_id: str):
    """Get personalized recommendations based on user history"""
    # Mock personalized recommendations
    recommendations = {
        "top_products": [
            {"name": "Organic Rice - 5kg", "purchase_count": 8, "savings": "₹120"},
            {"name": "Detergent Powder", "purchase_count": 6, "savings": "₹80"}, 
            {"name": "Cooking Oil - 1L", "purchase_count": 5, "savings": "₹45"}
        ],
        "suggested_switches": [
            {
                "current_product": "Premium Brand Detergent",
                "suggested_product": "Walmart Brand Detergent",
                "monthly_savings": "₹75",
                "quality_rating": 4.5
            }
        ],
        "reorder_suggestions": [
            {
                "product": "Organic Rice - 5kg",
                "last_purchase": "15 days ago",
                "typical_reorder": "20 days",
                "discount": "₹30 off"
            }
        ]
    }
    
    return {"recommendations": recommendations, "user_id": user_id}