from fastapi import APIRouter, HTTPException
from typing import List
from ..models import CartItem, CartItemCreate, CartItemUpdate, CartSummary
from ..database import cart_items_collection

router = APIRouter(prefix="/cart", tags=["cart"])

@router.get("/{user_id}", response_model=CartSummary)
async def get_cart(user_id: str):
    """Get user's cart"""
    cart_items = await cart_items_collection.find({"user_id": user_id}).to_list(100)
    
    total_items = sum(item["quantity"] for item in cart_items)
    total_amount = sum(item["price"] * item["quantity"] for item in cart_items)
    
    return CartSummary(
        items=[CartItem(**item) for item in cart_items],
        total_items=total_items,
        total_amount=total_amount
    )

@router.post("/{user_id}/items", response_model=CartItem)
async def add_to_cart(user_id: str, item_data: CartItemCreate):
    """Add item to cart"""
    # Check if item already exists in cart
    existing_item = await cart_items_collection.find_one({
        "user_id": user_id,
        "product_id": item_data.product_id
    })
    
    if existing_item:
        # Update quantity
        new_quantity = existing_item["quantity"] + item_data.quantity
        await cart_items_collection.update_one(
            {"id": existing_item["id"]},
            {"$set": {"quantity": new_quantity}}
        )
        updated_item = await cart_items_collection.find_one({"id": existing_item["id"]})
        return CartItem(**updated_item)
    else:
        # Add new item
        cart_item = CartItem(**item_data.dict())
        await cart_items_collection.insert_one(cart_item.dict())
        return cart_item

@router.put("/{user_id}/items/{item_id}", response_model=CartItem)
async def update_cart_item(user_id: str, item_id: str, update_data: CartItemUpdate):
    """Update cart item quantity"""
    if update_data.quantity <= 0:
        # Remove item if quantity is 0 or negative
        result = await cart_items_collection.delete_one({
            "id": item_id,
            "user_id": user_id
        })
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Cart item not found")
        return {"message": "Item removed from cart"}
    
    result = await cart_items_collection.update_one(
        {"id": item_id, "user_id": user_id},
        {"$set": {"quantity": update_data.quantity}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    updated_item = await cart_items_collection.find_one({"id": item_id})
    return CartItem(**updated_item)

@router.delete("/{user_id}/items/{item_id}")
async def remove_from_cart(user_id: str, item_id: str):
    """Remove item from cart"""
    result = await cart_items_collection.delete_one({
        "id": item_id,
        "user_id": user_id
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    return {"message": "Item removed from cart"}

@router.delete("/{user_id}/clear")
async def clear_cart(user_id: str):
    """Clear all items from cart"""
    result = await cart_items_collection.delete_many({"user_id": user_id})
    return {"message": f"Removed {result.deleted_count} items from cart"}

@router.post("/{user_id}/checkout")
async def checkout(user_id: str):
    """Process checkout"""
    # Get cart items
    cart_items = await cart_items_collection.find({"user_id": user_id}).to_list(100)
    
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    total_amount = sum(item["price"] * item["quantity"] for item in cart_items)
    total_items = sum(item["quantity"] for item in cart_items)
    
    # Clear cart after checkout
    await cart_items_collection.delete_many({"user_id": user_id})
    
    # In a real app, you would process payment here
    return {
        "message": "Order placed successfully",
        "order_id": f"WMT{user_id[-4:]}001",
        "total_items": total_items,
        "total_amount": total_amount,
        "estimated_delivery": "2 hours"
    }