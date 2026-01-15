import sys
from datetime import datetime, timedelta
from app.database import SessionLocal, engine, Base
from app.models.user import User
from app.models.event import Event
from app.models.participation import Participation
from app.models.review import Review
from app.utils.auth import get_password_hash

def create_sample_data():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    

