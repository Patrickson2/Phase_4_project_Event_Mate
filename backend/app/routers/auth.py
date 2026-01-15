from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.user import User
from ..schemas.user import UserCreate, UserLogin, UserResponse, Token
from ..utils.auth import verify_password, get_password_hash, create_access_token
from ..utils.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

