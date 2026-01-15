from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.participation import Participation
from ..models.event import Event
from ..models.user import User
from ..schemas.participation import ParticipationCreate, ParticipationUpdate, ParticipationResponse
from ..utils.dependencies import get_current_user
