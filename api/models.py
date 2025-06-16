from sqlalchemy import Column, Integer, String, Float, JSON
from database import Base
from pydantic import BaseModel, Field, validator
import re

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
	name: str = Field(..., min_length=1, max_length=100)
	location: str
	country: str = Field(..., min_length=2, max_length=2)
	type: str = Field(..., min_length=1, max_length=50)
	difficulty: str = Field(..., min_length=1, max_length=20)
	longitude: float
	latitude: float
	elevation: int
	track_length: str
	capacity: int
	established: int
	description: str
	
	@validator('name')
	def validate_name(cls, v):
		if not re.match(r'^[a-zA-Z0-9\s\-_]+$', v):
			raise ValueError('Invalid track name format')
		return v
	
	@validator('country')
	def validate_country(cls, v):
		if not re.match(r'^[A-Z]{2}$', v):
			raise ValueError('Invalid country code format')
		return v
 