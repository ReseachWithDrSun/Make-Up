from fastapi import APIRouter
from .products import PRODUCTS

router = APIRouter()

@router.get("/products")
def get_products():
    return PRODUCTS
