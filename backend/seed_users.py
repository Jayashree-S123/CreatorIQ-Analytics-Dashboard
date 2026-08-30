from sqlalchemy.orm import Session
from backend.database import engine
from backend.model import User

db = Session(engine)

# Check if users already exist
creator = db.query(User).filter(User.email == "creator@example.com").first()
admin = db.query(User).filter(User.email == "admin@example.com").first()

if not creator:
    creator = User(
        email="creator@example.com",
        password="123456",
        role="creator"
    )
    db.add(creator)

if not admin:
    admin = User(
        email="admin@example.com",
        password="admin123",
        role="admin"
    )
    db.add(admin)

db.commit()
db.close()

print("✅ Users added successfully!")