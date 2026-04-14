# backend/app/models.py

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

from pydantic import BaseModel

Base = declarative_base()

# -----------------------------
# SQLAlchemy Models (DB tables)
# -----------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)

    looks = relationship("Look", back_populates="user")


class Look(Base):
    __tablename__ = "looks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    # store makeup selections as JSON
    look_data = Column(JSON)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="looks")


class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    type = Column(String)  # lipstick, blush, foundation
    hex = Column(String)
    brand = Column(String)
    undertone = Column(String)
    url = Column(String)


# -----------------------------
# Pydantic Schemas (API layer)
# -----------------------------

class UserCreate(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True


class LookCreate(BaseModel):
    user_id: int
    look_data: dict


class LookOut(BaseModel):
    id: int
    user_id: int
    look_data: dict
    created_at: datetime

    class Config:
        from_attributes = True


class ProductOut(BaseModel):
    id: str
    name: str
    type: str
    hex: str
    brand: str
    undertone: str
    url: str

    class Config:
        from_attributes = True
