from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import SessionLocal, Employee, Attendance
from pydantic import BaseModel, EmailStr
from typing import List
from datetime import date
from models import Base, engine
Base.metadata.create_all(bind=engine)


app = FastAPI(title="HRMS Lite API")

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend domain yahan restrict kar sakte ho later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# DB Dependency
# =========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =========================
# Pydantic Schemas
# =========================
class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: str
    department: str

    model_config = {"from_attributes": True}


class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: str  # Present / Absent


class AttendanceResponse(BaseModel):
    id: int
    employee_id: str
    date: date
    status: str

    model_config = {"from_attributes": True}

# =========================
# Health Check
# =========================
@app.get("/")
def health():
    return {"status": "HRMS Lite backend running"}

# =========================
# Employee APIs
# =========================
@app.post("/employees", response_model=EmployeeResponse)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    if db.query(Employee).filter(Employee.employee_id == employee.employee_id).first():
        raise HTTPException(status_code=400, detail="Employee ID already exists")

    if db.query(Employee).filter(Employee.email == employee.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    db_employee = Employee(**employee.model_dump())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


@app.get("/employees", response_model=List[EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()


@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted"}

# =========================
# Attendance APIs
# =========================
@app.post("/attendance", response_model=AttendanceResponse)
def mark_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(
        Employee.employee_id == attendance.employee_id
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    existing = (
        db.query(Attendance)
        .filter(
            Attendance.employee_id == attendance.employee_id,
            Attendance.date == attendance.date,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400, detail="Attendance already marked for this date"
        )

    db_attendance = Attendance(**attendance.model_dump())
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance


@app.get("/attendance/{employee_id}", response_model=List[AttendanceResponse])
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()

