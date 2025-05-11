from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class User(BaseModel):
    name: str
    password: str

@app.post("/signup")
async def signup(user: User):
    return {"message": f"สมัครสมาชิก {user.name} สำเร็จ!"}

@app.post("/login")
async def login(user: User):
    return {"message": f"เข้าสู่ระบบ {user.name} สำเร็จ!"}
