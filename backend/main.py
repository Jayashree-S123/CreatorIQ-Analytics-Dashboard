from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.database import engine, Base, SessionLocal
from backend import model

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------- LOGIN ----------------

class LoginRequest(BaseModel):
    email: str
    password: str


@app.post("/login")
def login(user: LoginRequest):

    db = SessionLocal()

    db_user = db.query(model.User).filter(
        model.User.email == user.email
    ).first()

    if db_user and db_user.password == user.password:

        result = {
            "success": True,
            "message": "Login successful",
            "role": db_user.role,
            "user_id": db_user.id
        }

        db.close()
        return result

    db.close()

    return {
        "success": False,
        "message": "Invalid email or password"
    }


# ---------------- HOME ----------------

@app.get("/")
def home():
    return {
        "message": "CreatorIQ Analytics Dashboard Backend is running!"
    }


# ---------------- HEALTH ----------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# ---------------- CREATOR ----------------

@app.get("/creators/{user_id}")
def get_creator(user_id: int):

    db = SessionLocal()

    creator = db.query(model.Creator).filter(
        model.Creator.user_id == user_id
    ).first()

    if not creator:

        db.close()

        return {
            "success": False,
            "message": "Creator not found"
        }

    result = {
        "success": True,
        "id": creator.id,
        "user_id": creator.user_id,
        "name": creator.name,
        "platform": creator.platform,
        "followers": creator.followers,
        "engagement_rate": creator.engagement_rate
    }

    db.close()

    return result


# ---------------- ADMIN STATS ----------------

@app.get("/admin/stats")
def get_admin_stats():

    db = SessionLocal()

    total_creators = db.query(model.Creator).count()

    followers_data = db.query(
        model.Creator.followers
    ).all()

    total_followers = sum(
        creator.followers
        for creator in followers_data
    )

    engagement_data = db.query(
        model.Creator.engagement_rate
    ).all()

    if engagement_data:

        average_engagement = sum(
            creator.engagement_rate
            for creator in engagement_data
        ) / len(engagement_data)

    else:
        average_engagement = 0

    db.close()

    return {
        "total_creators": total_creators,
        "total_followers": total_followers,
        "average_engagement": round(
            average_engagement,
            2
        )
    }


# ---------------- ADMIN CREATOR LIST ----------------

@app.get("/admin/creators")
def get_all_creators():

    db = SessionLocal()

    creators = db.query(model.Creator).all()

    result = []

    for creator in creators:

        result.append({
            "id": creator.id,
            "name": creator.name,
            "platform": creator.platform,
            "followers": creator.followers,
            "engagement_rate": creator.engagement_rate
        })

    db.close()

    return result


# ---------------- ADMIN CREATOR DETAILS ----------------

@app.get("/admin/creators/{creator_id}")
def get_creator_details(creator_id: int):

    db = SessionLocal()

    creator = db.query(model.Creator).filter(
        model.Creator.id == creator_id
    ).first()

    if not creator:

        db.close()

        return {
            "success": False,
            "message": "Creator not found"
        }

    result = {
        "success": True,
        "id": creator.id,
        "user_id": creator.user_id,
        "name": creator.name,
        "platform": creator.platform,
        "followers": creator.followers,
        "engagement_rate": creator.engagement_rate
    }

    db.close()

    return result