from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

PRODUCTS = [
    {"id":"lip1","name":"Ruby Woo","type":"lipstick","hex":"#c2185b"},
    {"id":"eye1","name":"Lavender","type":"eyeshadow","hex":"#6a5acd"},
    {"id":"blush1","name":"Peach Glow","type":"blush","hex":"#ff6b81"}
]

@app.get("/api/products")
def products():
    return PRODUCTS
