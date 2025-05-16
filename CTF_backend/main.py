from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import create_db_and_tables, get_engine
from database.models.user import User
from database.models.product import Product
from routers.v1.auth_router import auth_router
from routers.v1.safe_router import safe_router
from routers.v1.product_router import product_router
from sqlmodel import Session
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    engine = get_engine()
    create_db_and_tables(engine)
    
    with Session(engine) as session:
        result = session.exec(session.query(User).where(User.username == "secret_user"))
        if not result.first():
            default_user = User(
                username="secret_user", 
                email="secret_user@gmail.com", 
                password="5mxmeldbg8",
                is_admin=False
            )
            session.add(default_user)
            session.commit()
            session.refresh(default_user)
            
            products = [
                Product(
                    name="iPhone 15 Pro", 
                    description="Brand new iPhone, totally not stolen", 
                    price=799.99,
                    image_url="phone.jpg",
                    user_id=default_user.id
                ),
                Product(
                    name="65\" OLED TV", 
                    description="Fell off a truck, excellent condition", 
                    price=899.99,
                    image_url="tv.jpg",
                    user_id=default_user.id
                ),
                Product(
                    name="Tesla Model 3", 
                    description="Low mileage, clean title (ignore VIN scratches)", 
                    price=29999.99,
                    image_url="car.jpg",
                    user_id=default_user.id
                ),
                Product(
                    name="Racing Bike", 
                    description="Carbon fiber frame, definitely legitimate", 
                    price=499.99,
                    image_url="bike.jpg",
                    user_id=default_user.id
                ),
                Product(
                    name="MacBook Pro", 
                    description="Still has original stickers, password removed", 
                    price=699.99,
                    image_url="laptop.jpg",
                    user_id=default_user.id
                ),
                Product(
                    name="Sony Headphones", 
                    description="Good audio quality, no scratches", 
                    price=99.99,
                    image_url="headphones.jpg",
                    user_id=default_user.id
                )
            ]
            
            for product in products:
                session.add(product)
            
            session.commit()


app.include_router(auth_router)
app.include_router(safe_router)
app.include_router(product_router)
