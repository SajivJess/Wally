from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import routes
from routes import users, products, cart, missions, meal_plans, recommendations
from database import init_sample_data

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Walmart SmartCommerce+ API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add basic health check
@api_router.get("/")
async def root():
    return {"message": "Walmart SmartCommerce+ API is running", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "walmart-smartcommerce-api"}

# Include all route modules
api_router.include_router(users.router)
api_router.include_router(products.router)
api_router.include_router(cart.router)
api_router.include_router(missions.router)
api_router.include_router(meal_plans.router)
api_router.include_router(recommendations.router)

# Include the main API router in the app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize database with sample data on startup"""
    await init_sample_data()
    logger.info("✅ Database initialized with sample data")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
