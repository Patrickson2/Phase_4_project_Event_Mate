from pydantic import BaseModel

class ParticipationCreate(BaseModel):
    event_id: int

class ParticipationUpdate(BaseModel):
    status: str

