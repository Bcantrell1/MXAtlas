from sqlalchemy import Column, Integer, String, Float, JSON
from database import Base

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