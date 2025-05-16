from dto.LoginData import LoginData
from sqlalchemy import select
from sqlmodel import Session
from dto.RegisterData import RegisterData
from fastapi import APIRouter, Depends, HTTPException
from database.database import get_session
from database.models.user import User
import sqlalchemy

auth_router = APIRouter(prefix="/v1/auth", tags=["auth"])

@auth_router.post("/login")
async def login(data: LoginData, session: Session = Depends(get_session)):
    query = f"SELECT * FROM user WHERE username = '{data.username}' AND password = '{data.password}'"
    result = session.execute(sqlalchemy.text(query))
    user = result.first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    message = "Login successful"
    if user.username == "secret_user":
        message = "FBG{zkagkqhtomzvioaagipi2}"
    
    return {"message": message, "is_admin": user.is_admin}

@auth_router.post("/register")
async def register(data: RegisterData, session: Session = Depends(get_session)):
    statement = select(User).where(User.username == data.username)
    result = session.execute(statement)
    if result.first():
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = User(email=data.email, username=data.username, password=data.password)
    session.add(new_user)
    session.commit()
    return {"message": "FBG{oemiyragpqemwklshcgc1}", "is_admin": False}

@auth_router.post("/logout")
async def logout():
    return {"message": "Logout successful"}
