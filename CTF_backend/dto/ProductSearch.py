from pydantic import BaseModel


class ProductSearch(BaseModel):
    query: str 