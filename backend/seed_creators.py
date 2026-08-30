from backend.database import SessionLocal
from backend.model import Creator

db = SessionLocal()

if db.query(Creator).count() == 0:
    creators = [
        Creator(
            user_id=1,
            name="Alex",
            platform="Instagram",
            followers=125000,
            engagement_rate=4.8
        ),
        Creator(
            user_id=2,
            name="Priya",
            platform="YouTube",
            followers=89000,
            engagement_rate=6.2
        ),
        Creator(
            user_id=1,
            name="Rahul",
            platform="Instagram",
            followers=210000,
            engagement_rate=3.9
        )
    ]

    db.add_all(creators)
    db.commit()
    print("✅ Creator data added successfully!")
else:
    print("ℹ️ Creator data already exists.")

db.close()