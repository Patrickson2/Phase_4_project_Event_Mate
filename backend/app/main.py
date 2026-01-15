from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth_router, events_router, participation_router, reviews_router

Base.metadata.create_all(bind=engine)


