"""
FastAPI Backend for GENE-Q Frontend
Main entry point for the API server
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import projects, data, missing_value, verification, imputation

app = FastAPI(
    title="GENE-Q API",
    description="Backend API for GENE-Q Quality Control System",
    version="1.0.0"
)

# CORS 설정 - 프론트엔드와 통신을 위해
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://gene-fe.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API 라우터 등록
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(data.router, prefix="/api/data", tags=["data"])
app.include_router(missing_value.router, prefix="/api/missing-value", tags=["missing-value"])
app.include_router(verification.router, prefix="/api/verification", tags=["verification"])
app.include_router(imputation.router, prefix="/api/imputation", tags=["imputation"])


@app.get("/")
async def root():
    return {"message": "GENE-Q API Server", "version": "1.0.0"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}

