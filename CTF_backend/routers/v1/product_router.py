from dto.ProductSearch import ProductSearch
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from database.database import get_session
from database.models.product import Product
import sqlalchemy

product_router = APIRouter(prefix="/v1/products", tags=["products"])


@product_router.get("/")
async def get_products(session: Session = Depends(get_session)):
    statement = "SELECT * FROM product"
    result = session.execute(sqlalchemy.text(statement))
    products = result.all()
    
    if not products:
        return {"products": []}
    
    products_list = []
    for p in products:
        product_dict = {}
        for key in p._mapping.keys():
            product_dict[key] = p._mapping[key]
        products_list.append(product_dict)
        
    return {"products": products_list}


@product_router.post("/search")
async def search_products(data: ProductSearch, session: Session = Depends(get_session)):
    query = f"SELECT * FROM product WHERE name LIKE '%{data.query}%' OR description LIKE '%{data.query}%'"
    result = session.exec(sqlalchemy.text(query))
    products = result.all()

    if not products:
        return {"products": [], "message": "No products found"}

    products_list = [dict(row._mapping) for row in products]

    return {"products": products_list}


@product_router.get("/{product_id}")
async def get_product(product_id: int, session: Session = Depends(get_session)):
    statement = f"SELECT * FROM product WHERE id = {product_id}"
    result = session.execute(sqlalchemy.text(statement))
    product = result.first()
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_dict = {}
    for key in product._mapping.keys():
        product_dict[key] = product._mapping[key]
        
    return {"product": product_dict} 