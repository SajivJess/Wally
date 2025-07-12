from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime
import uuid

# User Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    points: int = 0
    savings_this_month: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    name: str
    location: str

# Product Models
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    price: int
    original_price: Optional[int] = None
    image: str
    category: str
    description: Optional[str] = None
    in_stock: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(BaseModel):
    name: str
    price: int
    original_price: Optional[int] = None
    image: str
    category: str
    description: Optional[str] = None

# Bundle Models
class Bundle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    price: int
    original_price: int
    savings: int
    items_count: int
    image: str
    product_ids: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BundleCreate(BaseModel):
    name: str
    price: int
    original_price: int
    items_count: int
    image: str
    product_ids: List[str] = []

# Cart Models
class CartItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    product_id: str
    product_name: str
    price: int
    quantity: int = 1
    image: str
    added_at: datetime = Field(default_factory=datetime.utcnow)

class CartItemCreate(BaseModel):
    user_id: str
    product_id: str
    product_name: str
    price: int
    image: str
    quantity: int = 1

class CartItemUpdate(BaseModel):
    quantity: int

# Loyalty Mission Models
class LoyaltyMission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    reward: str
    progress: int = 0
    target: int
    mission_type: str
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class LoyaltyMissionCreate(BaseModel):
    title: str
    reward: str
    target: int
    mission_type: str

# Meal Plan Models
class MealPlan(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    goal_type: str  # "Weight Loss", "Family Dinners", "High Protein"
    monday: List[str]
    tuesday: List[str]
    wednesday: List[str]
    thursday: List[str]
    friday: List[str]
    saturday: List[str]
    sunday: List[str]
    estimated_cost: int
    calories_per_day: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MealPlanCreate(BaseModel):
    goal_type: str
    monday: List[str]
    tuesday: List[str]
    wednesday: List[str]
    thursday: List[str]
    friday: List[str]
    saturday: List[str]
    sunday: List[str]
    estimated_cost: int
    calories_per_day: int

# Refill Alert Models
class RefillAlert(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    product_name: str
    days_left: int
    discount: str
    image: str
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class RefillAlertCreate(BaseModel):
    user_id: str
    product_name: str
    days_left: int
    discount: str
    image: str

# Smart Tip Models
class SmartTip(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    savings: str
    image: str
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class SmartTipCreate(BaseModel):
    title: str
    savings: str
    image: str

# Response Models
class CartSummary(BaseModel):
    items: List[CartItem]
    total_items: int
    total_amount: int

class UserProfile(BaseModel):
    user: User
    cart_summary: CartSummary
    active_missions: List[LoyaltyMission]