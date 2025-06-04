from sqlalchemy import Column, Integer, String, Float, JSON
from database import Base
from pydantic import BaseModel

class Track(Base):
    __tablename__ = 'tracks'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    location = Column(String)
    country = Column(String)
    type = Column(String)
    difficulty = Column(String)
    longitude = Column(Float)
    latitude = Column(Float)
    elevation = Column(Integer)
    track_length = Column(String)
    capacity = Column(Integer)
    established = Column(Integer)
    description = Column(String)

class NewTrack(BaseModel):
	name: str
	location: str
	country: str
	type: str
	difficulty: str
	longitude: float
	latitude: float
	elevation: int
	track_length: str
	capacity: int
	established: int
	description: str
 