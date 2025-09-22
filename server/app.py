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
async def login(user: schemas.LoginModel):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": db_user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


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
# Yield Prediction
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
        df_input = pd.DataFrame([input_data])

        categorical_cols = ['Crop', 'State', 'soil_type', 'Fertilizer_Type']
        for col in categorical_cols:
            df_input[col] = df_input[col].astype('category').cat.codes

        if 'sowing_date' in df_input.columns:
            df_input = df_input.drop(columns=['sowing_date'])

        dmatrix = xgb.DMatrix(df_input)
        predicted_yield = float(model.predict(dmatrix)[0])

        total_production_kg = predicted_yield * input_data["area"]
        total_production_tonnes = total_production_kg / 1000

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

        # Rainfall
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
            "area": input_data["area"],
            "weather": {
                "temperature": input_data["Temp"],
                "humidity": input_data["Humidity"],
                "description": "Data from API"},
            "predicted_yield_kgha": predicted_yield,
            "total_production_tonnes": total_production_tonnes,
            "recommendations": recommendations,
            "sowing_date": input_data["sowing_date"]
        }

        return JSONResponse(content=result)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)


# ==============================
# Image Analysis
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

    # --- Nitrogen deficiency (yellow) ---
    if yellow_ratio > 0.05:
        analysis["diagnosis"] += [
            "Nitrogen deficiency detected (yellow leaves).",
            "Yellowing is reducing chlorophyll production.",
            "Lower leaves are more affected, indicating mobile nutrient deficiency.",
            "Crop growth rate may be slowing due to poor photosynthesis.",
            "Yield potential could be reduced if not corrected."
        ]
        analysis["recommendations"] += [
            "Apply nitrogen-rich fertilizer immediately (e.g., urea).",
            "Consider foliar spray with urea for quick absorption.",
            "Incorporate organic manure for long-term nitrogen supply.",
            "Avoid overwatering, as it leaches nitrogen from soil.",
            "Monitor crop weekly for improvement in leaf greenness."
        ]

    # --- Disease / pest (brown) ---
    if brown_ratio > 0.02:
        analysis["diagnosis"] += [
            "Possible disease or pest attack (brown/black spots).",
            "Spots may indicate fungal infections like leaf blight.",
            "Irregular lesions suggest pest chewing damage.",
            "Photosynthesis efficiency is likely reduced.",
            "Risk of spread across the crop if untreated."
        ]
        analysis["recommendations"] += [
            "Inspect leaves with magnifying lens for pests/fungal spores.",
            "Apply recommended fungicide/pesticide for the crop type.",
            "Remove and burn heavily affected leaves to prevent spread.",
            "Ensure proper field ventilation to reduce humidity.",
            "Rotate crops next season to break pest/disease cycle."
        ]

    # --- Healthy crop ---
    if green_ratio > 0.8 and yellow_ratio < 0.05 and brown_ratio < 0.02:
        analysis["diagnosis"] += [
            "Crop appears healthy.",
            "Leaves show strong green color, indicating good chlorophyll.",
            "Nutrient balance appears sufficient.",
            "Minimal pest/disease symptoms detected.",
            "Overall growth condition is optimal."
        ]
        analysis["recommendations"] += [
            "Maintain regular irrigation schedule.",
            "Continue applying balanced NPK fertilizer.",
            "Ensure proper weed management to avoid competition.",
            "Keep monitoring for early signs of stress.",
            "Plan preventive fungicide spray if season is humid."
        ]

    # --- Severe fungal damage ---
    if green_ratio < 0.7 and brown_ratio > 0.1:
        analysis["diagnosis"] += [
            "Severe leaf damage due to fungal infection or pests.",
            "Large areas of necrosis visible.",
            "Green cover significantly reduced.",
            "Crop canopy may not intercept sunlight effectively.",
            "High yield loss risk if untreated."
        ]
        analysis["recommendations"] += [
            "Apply systemic fungicide immediately.",
            "Improve drainage to reduce fungal growth.",
            "Avoid excessive irrigation.",
            "Spray neem oil or biocontrol agents as eco-friendly option.",
            "Consult local agri expert for targeted treatment."
        ]

    # --- Nutrient deficiency (yellow + low green) ---
    if yellow_ratio > 0.1 and green_ratio < 0.6:
        analysis["diagnosis"] += [
            "Significant nutrient deficiency detected.",
            "Likely nitrogen + potassium imbalance.",
            "Chlorosis spreading across canopy.",
            "Photosynthesis and energy transfer hampered.",
            "Risk of stunted growth and low yield."
        ]
        analysis["recommendations"] += [
            "Apply balanced NPK fertilizer blend.",
            "Use foliar sprays with micronutrients.",
            "Add compost or manure to improve soil fertility.",
            "Check pH of soil to ensure nutrient availability.",
            "Repeat treatment within 10–14 days if symptoms persist."
        ]

    # --- Water stress (yellow + green) ---
    if yellow_ratio > 0.08 and brown_ratio < 0.02 and green_ratio > 0.6:
        analysis["diagnosis"] += [
            "Possible water stress or early drought symptoms.",
            "Yellowing edges while center remains green.",
            "Crop under mild stress conditions.",
            "Soil moisture may be insufficient.",
            "Stress can progress quickly if untreated."
        ]
        analysis["recommendations"] += [
            "Increase irrigation frequency slightly.",
            "Check soil moisture before watering.",
            "Use mulch to conserve soil water.",
            "Avoid waterlogging while irrigating.",
            "Plan irrigation around cooler hours of day."
        ]

    # --- Combined fungal + nutrient stress ---
    if yellow_ratio > 0.07 and brown_ratio > 0.07:
        analysis["diagnosis"] += [
            "Combined nutrient stress and fungal infection risk.",
            "Yellowing + brown spots suggest multiple stress factors.",
            "Nutrient uptake may be blocked by disease.",
            "Leaves losing photosynthetic area rapidly.",
            "Crop weakening under combined pressure."
        ]
        analysis["recommendations"] += [
            "Apply balanced fertilizer along with fungicide.",
            "Remove infected plant parts promptly.",
            "Improve irrigation drainage.",
            "Use resistant crop variety in next cycle.",
            "Strengthen crop with organic growth boosters."
        ]

    # --- Very poor health ---
    if green_ratio < 0.5:
        analysis["diagnosis"] += [
            "Overall crop health is very poor.",
            "Less than half of canopy is healthy.",
            "Severe stress detected across the field.",
            "High chance of crop failure if untreated.",
            "Emergency intervention required."
        ]
        analysis["recommendations"] += [
            "Conduct urgent soil and water quality tests.",
            "Reapply broad-spectrum fertilizer.",
            "Apply fungicide if fungal spread visible.",
            "Ensure proper pest monitoring immediately.",
            "Consult agronomist for last-stage recovery plan."
        ]

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
