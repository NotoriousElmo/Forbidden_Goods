from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field


class ProductBase(SQLModel):
    name: str = Field(index=True)
    description: str
    price: float
    image_url: str
    user_id: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)


class Product(ProductBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True) 