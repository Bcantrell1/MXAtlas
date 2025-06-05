from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import SessionLocal, get_db
from models import NewTrack, Track

app = FastAPI()

app.add_middleware(
		CORSMiddleware,
		allow_origins=["*"],
		allow_credentials=True,
		allow_methods=["*"],
		allow_headers=["*"],
)	

@app.get("/tracks")
def get_tracks(type: str = None, country: str = None, difficulty: str = None, db: Session = Depends(get_db)):
    try:
        query = db.query(Track)
        if type:
            query = query.filter(Track.type == type)
        if country:
            query = query.filter(Track.country == country)
        if difficulty:
            query = query.filter(Track.difficulty == difficulty)
        return query.all()
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}") 

@app.post("/track/")
def create_track(track: NewTrack, db: Session = Depends(get_db)):
	try:
		db.add(track)
		db.commit()
		return {"message": "Track created successfully"}
	except Exception as e:
		print(f"Unexpected error: {e}")
		raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}") 

@app.get("/tracks/{track_id}")
def get_track(track_id: int, db: Session = Depends(get_db)):
    try:
        track = db.query(Track).filter(Track.id == track_id).first()
        if not track:
            raise HTTPException(status_code=404, detail="Track not found")
        return track
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}") 

@app.get("/tracks/search")
def search_tracks(query: str, db: Session = Depends(get_db)):
    try:
        tracks = db.query(Track).filter(Track.name.ilike(f"%{query}%")).all()
        return tracks
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}") 

@app.get("/")
def root():
    return {"message": "MX Atlas API is running"}

@app.get("/health")
def health_check():
    try:
        with SessionLocal() as db:
            db.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}