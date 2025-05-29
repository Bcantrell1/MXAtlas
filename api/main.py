from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import SessionLocal, get_db
from models import Track

app = FastAPI()

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