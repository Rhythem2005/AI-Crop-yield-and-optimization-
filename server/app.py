from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import timedelta
import pandas as pd
import numpy as np
import xgboost as xgb
import cv2
import tempfile
import warnings

# Local imports (keep these files as they are in your project)
from database import users_collection
from auth import get_password_hash, verify_password, create_access_token, verify_token
import schemas

warnings.filterwarnings("ignore")

app = FastAPI(title="Crop Prediction & Image Analysis API")

# ==============================
# CORS Middleware
# ==============================
# (kept permissive origin from your backend; change in production if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

# OAuth2 scheme (for dependency injection / protected routes)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# ==============================
# AUTH ROUTES (from friend's code)
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
async def login(user: schemas.LoginModel):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": db_user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# Dependency: get current user (use with Depends(get_current_user) on protected routes)
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
# Yield Prediction (your original code)
# ==============================
class YieldInput(BaseModel):
    Crop: str
    State: str
    Year: int
    N: float
    P: float
    K: float
    pH: float
    soil_type: str
    Rainfall: float
    Temp: float
    Humidity: float
    Fertilizer_Type: str
    Fertilizer_Amount: float
    Pesticide_Amount: float
    sowing_date: str
    area: float


@app.post("/predict_yield")
async def predict_yield_api(data: YieldInput):
    input_data = data.dict()

    try:
        # Convert to DataFrame
        df_input = pd.DataFrame([input_data])

        # XGBoost needs DMatrix for prediction
        # Encode categorical columns for XGBoost
        categorical_cols = ['Crop', 'State', 'soil_type', 'Fertilizer_Type']
        for col in categorical_cols:
            df_input[col] = df_input[col].astype('category').cat.codes

        # Drop sowing_date column because model doesn't use it
        if 'sowing_date' in df_input.columns:
            df_input = df_input.drop(columns=['sowing_date'])

        # XGBoost DMatrix for prediction
        dmatrix = xgb.DMatrix(df_input)
        predicted_yield = float(model.predict(dmatrix)[0])

        total_production = float(predicted_yield * input_data["area"] / 1000)

        # Recommendations
        recommendations = []

        # Nitrogen
        if input_data["N"] < 30:
            recommendations.append("🌱 Nitrogen very low: Apply 25–30 kg/ha urea immediately.")
        elif input_data["N"] < 50:
            recommendations.append("🌱 Nitrogen low: Apply nitrogen-rich fertilizer like urea.")
        else:
            recommendations.append("🌱 Nitrogen levels are sufficient.")

        # Phosphorus
        if input_data["P"] < 15:
            recommendations.append("🌿 Phosphorus very low: Apply 30–40 kg/ha DAP.")
        elif input_data["P"] < 25:
            recommendations.append("🌿 Phosphorus low: Consider additional phosphorus fertilizer.")
        else:
            recommendations.append("🌿 Phosphorus levels are sufficient.")

        # Potassium
        if input_data["K"] < 20:
            recommendations.append("🪴 Potassium very low: Apply 30–40 kg/ha MOP.")
        elif input_data["K"] < 35:
            recommendations.append("🪴 Potassium low: Consider additional potassium fertilizer.")
        else:
            recommendations.append("🪴 Potassium levels are sufficient.")

        # Soil pH
        if input_data["pH"] < 6.0:
            recommendations.append("🧪 Soil is acidic. Apply lime to raise pH and improve nutrient uptake.")
        elif input_data["pH"] > 7.5:
            recommendations.append("🧪 Soil is alkaline. Add organic matter or gypsum to improve pH.")
        else:
            recommendations.append("🧪 Soil pH is optimal.")

        # Rainfall / Irrigation
        if input_data["Rainfall"] < 200:
            recommendations.append("💧 Low rainfall detected. Irrigation is necessary.")
        elif input_data["Rainfall"] > 800:
            recommendations.append("💧 High rainfall. Ensure proper drainage to avoid waterlogging.")
        else:
            recommendations.append("💧 Rainfall is adequate.")

        # Temperature
        if input_data["Temp"] > 35:
            recommendations.append("☀️ High temperature: Use mulching/shading or plant heat-tolerant varieties.")
        elif input_data["Temp"] < 15:
            recommendations.append("❄️ Low temperature: Protect crops from frost if applicable.")
        else:
            recommendations.append("🌡️ Temperature is within optimal range.")

        # Humidity
        if input_data["Humidity"] > 80:
            recommendations.append("💦 High humidity: Monitor for fungal diseases and apply fungicides proactively.")
        elif input_data["Humidity"] < 50:
            recommendations.append("💦 Low humidity: Use drip irrigation or maintain soil moisture.")
        else:
            recommendations.append("💦 Humidity is within ideal range.")

        # Fertilizer & Pesticide
        if input_data["Fertilizer_Amount"] < 50:
            recommendations.append(f"🌾 Fertilizer amount is low. Consider increasing {input_data['Fertilizer_Type']} fertilizer for optimal growth.")
        if input_data["Pesticide_Amount"] < 5:
            recommendations.append("🐛 Pesticide amount is low. Regular pest monitoring is recommended.")

        # Overall crop health status
        if predicted_yield > 80:
            crop_status = "Excellent"
            recommendations.append("📊 Overall crop health is excellent. Maintain current practices.")
        elif predicted_yield > 50:
            crop_status = "Moderate"
            recommendations.append("📊 Overall crop health is moderate. Follow above recommendations for better yield.")
        else:
            crop_status = "Poor"
            recommendations.append("📊 Overall crop health is poor. Immediate action required: optimize nutrients, irrigation, and pest control.")

        result = {
            "crop_name": input_data["Crop"],
            "location": input_data["State"],
            "weather": {
            "temperature": input_data["Temp"],
            "humidity": input_data["Humidity"],
            "description": "Data from API"},
            "predicted_yield_kgha": predicted_yield,
            "total_production_tonnes": total_production,
            "recommendations": recommendations,
            "sowing_date": input_data["sowing_date"]
        }

        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)


# ==============================
# Image Analysis (your original code)
# ==============================
def analyze_crop_health_detailed(image_path, crop_type="Wheat"):
    img = cv2.imread(image_path)
    if img is None:
        return {"error": "Image not found!"}

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_resized = cv2.resize(img_rgb, (256, 256))
    hsv = cv2.cvtColor(img_resized, cv2.COLOR_RGB2HSV)

    total_pixels = img_resized.shape[0] * img_resized.shape[1]

    green_mask = cv2.inRange(hsv, (25, 40, 40), (95, 255, 255))
    green_count = np.sum(green_mask > 0)

    yellow_mask = cv2.inRange(hsv, (20, 100, 100), (40, 255, 255))
    yellow_count = np.sum(yellow_mask > 0)

    brown_mask = cv2.inRange(hsv, (10, 50, 20), (20, 255, 100))
    brown_count = np.sum(brown_mask > 0)

    green_ratio = green_count / total_pixels
    yellow_ratio = yellow_count / total_pixels
    brown_ratio = brown_count / total_pixels

    health_score = green_ratio * 100
    analysis = {
        "crop_type": crop_type,
        "health_score_percent": round(health_score, 2),
        "leaf_conditions": {
            "healthy_green_percent": round(green_ratio * 100, 2),
            "yellow_leaves_percent": round(yellow_ratio * 100, 2),
            "brown_spots_percent": round(brown_ratio * 100, 2)
        },
        "diagnosis": [],
        "recommendations": []
    }

    if yellow_ratio > 0.05:
        analysis["diagnosis"].append("Nitrogen deficiency detected (yellow leaves).")
        analysis["recommendations"].append("Apply nitrogen-rich fertilizer.")
    if brown_ratio > 0.02:
        analysis["diagnosis"].append("Possible disease or pest attack (brown/black spots).")
        analysis["recommendations"].append("Inspect crop for pests/diseases and use appropriate treatment.")
    if green_ratio > 0.8 and yellow_ratio < 0.05 and brown_ratio < 0.02:
        analysis["diagnosis"].append("Crop appears healthy.")
        analysis["recommendations"].append("Maintain regular irrigation and monitoring.")

    return analysis


@app.post("/analyze_crop_image")
async def analyze_crop_image_api(file: UploadFile = File(...), crop_type: str = "Wheat"):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        result = analyze_crop_health_detailed(tmp_path, crop_type)
        return JSONResponse(content={"result": result})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
