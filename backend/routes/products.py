from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import Product, ProductCreate, Bundle, BundleCreate
from database import products_collection, bundles_collection

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[Product])
async def get_products(
    category: Optional[str] = Query(None, description="Filter by category"),
    limit: int = Query(50, description="Number of products to return")
):
    """Get all products with optional category filter"""
    filter_query = {}
    if category:
        filter_query["category"] = category
    
    products = await products_collection.find(filter_query).limit(limit).to_list(limit)
    return [Product(**product) for product in products]

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get product by ID"""
    product = await products_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@router.post("/", response_model=Product)
async def create_product(product_data: ProductCreate):
    """Create a new product"""
    product = Product(**product_data.dict())
    await products_collection.insert_one(product.dict())
    return product

@router.get("/trending/location", response_model=List[Product])
async def get_trending_products(location: str = Query(..., description="User location")):
    """Get trending products for a specific location"""
    # For now, return products from specific categories as "trending"
    trending_categories = ["food", "electronics", "beauty"]
    products = await products_collection.find(
        {"category": {"$in": trending_categories}}
    ).limit(10).to_list(10)
    return [Product(**product) for product in products]

# Bundle routes
@router.get("/bundles/", response_model=List[Bundle])
async def get_bundles(limit: int = Query(10, description="Number of bundles to return")):
    """Get all smart bundles"""
    bundles = await bundles_collection.find().limit(limit).to_list(limit)
    return [Bundle(**bundle) for bundle in bundles]

@router.get("/bundles/{bundle_id}", response_model=Bundle)
async def get_bundle(bundle_id: str):
    """Get bundle by ID"""
    bundle = await bundles_collection.find_one({"id": bundle_id})
    if not bundle:
        raise HTTPException(status_code=404, detail="Bundle not found")
    return Bundle(**bundle)

@router.post("/bundles/", response_model=Bundle)
async def create_bundle(bundle_data: BundleCreate):
    """Create a new bundle"""
    bundle = Bundle(**bundle_data.dict(), savings=bundle_data.original_price - bundle_data.price)
    await bundles_collection.insert_one(bundle.dict())
    return bundle

@router.get("/search/visual")
async def visual_search(query: str = Query(..., description="Search query from image")):
    """Simulate AI visual search results"""
    # Mock AI search results - in real implementation, this would use ML/AI
    mock_results = [
        {
            "id": "match-1",
            "name": "Premium Notebook - 200 pages",
            "price": 120,
            "original_price": 150,
            "match_percentage": 95,
            "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=150&fit=crop",
            "category": "stationery"
        },
        {
            "id": "match-2", 
            "name": "Student Diary - Hardcover",
            "price": 80,
            "original_price": 100,
            "match_percentage": 87,
            "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
            "category": "stationery"
        },
        {
            "id": "match-3",
            "name": "Office Planner - Weekly", 
            "price": 250,
            "original_price": 300,
            "match_percentage": 82,
            "image": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&h=150&fit=crop",
            "category": "stationery"
        }
    ]
    return {"results": mock_results, "query": query}