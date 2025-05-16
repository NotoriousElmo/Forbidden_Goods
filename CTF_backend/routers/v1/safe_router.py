from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

safe_router = APIRouter(prefix="/v1/safe", tags=["safe"])

class SafeAccess(BaseModel):
    secret: str

siteAuthor = "Eric Baron"

@safe_router.post("/access")
async def access_safe(data: SafeAccess):
    if data.secret == "Can I please enter the safe?":
        return {"success": True, "message": "FBG{ylfbflshleyqlvaqmccw}"}
    return {"success": False, "message": "Invalid code"}

@safe_router.post("/submit")
async def submit_flag(data: SafeAccess):
    if data.secret == siteAuthor:
        return {"message": "FBG{bdevizlpepmimnlprwyx}"}
    return {"message": "Invalid secret"} 