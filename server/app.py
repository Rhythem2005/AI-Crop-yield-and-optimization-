from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware  # ✅ Added for CORS
from pydantic import BaseModel
from jose import JWTError, jwt
from datetime import timedelta
import pandas as pd
import numpy as np
import xgboost as xgb
import cv2
import tempfile
import warnings
from utils import verify_password, create_access_token
from schemas import LoginModel

# Local imports
from database import users_collection
from auth import get_password_hash, verify_password, create_access_token, verify_token
import schemas

warnings.filterwarnings("ignore")

app = FastAPI(title="Crop Prediction & Image Analysis API")

# ==============================
# CORS Middleware
# ==============================
origins = [
    "http://localhost:5173",  # Vite dev server URL
    "http://127.0.0.1:5173",
    "http://localhost:3000",  # in case React runs on 3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# Load ML Model
# ==============================
try:
    model = xgb.Booster()
    model.load_model("crop_yield_model.json")
    print("Model loaded successfully!")
except FileNotFoundError:
    print("Error: 'crop_yield_model.json' not found. Place it in the project folder.")
    raise

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# ==============================
# AUTH ROUTES
# ==============================

@app.post("/signup")
async def signup(user: schemas.SignupModel):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password

    await users_collection.insert_one(user_dict)
    return {"message": "User created successfully"}


@app.post("/login")
async def login(user: LoginModel):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": db_user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Dependency: get current user
async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    email: str = payload.get("sub")
    user = await users_collection.find_one({"email": email})
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

# ==============================
# Your ML Prediction & Image APIs
# (keep your existing predict_yield and analyze_crop_image_api)
# ==============================
