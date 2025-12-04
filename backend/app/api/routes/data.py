"""
Data management API routes
"""

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime
from app.models.schemas import DataFile, DataFileCreate
from app.models.base import DataFile as DataFileModel
from app.db.session import get_db

router = APIRouter()


def datafile_to_dict(datafile: DataFileModel) -> dict:
    """SQLAlchemy 모델을 딕셔너리로 변환"""
    return {
        "id": datafile.id,
        "name": datafile.name,
        "size": datafile.size,
        "createdAt": datafile.created_at.strftime("%Y-%m-%d") if datafile.created_at else None,
    }


@router.get("", response_model=List[DataFile])
async def get_data_files(project_id: Optional[int] = None, db: Session = Depends(get_db)):
    """데이터 파일 목록 조회"""
    query = db.query(DataFileModel)
    if project_id:
        query = query.filter(DataFileModel.project_id == project_id)
    
    data_files = query.all()
    return [datafile_to_dict(df) for df in data_files]


@router.get("/{file_id}", response_model=DataFile)
async def get_data_file(file_id: int, db: Session = Depends(get_db)):
    """특정 데이터 파일 조회"""
    data_file = db.query(DataFileModel).filter(DataFileModel.id == file_id).first()
    if not data_file:
        raise HTTPException(status_code=404, detail="Data file not found")
    return datafile_to_dict(data_file)


@router.post("/upload")
async def upload_data_file(
    file: UploadFile = File(...),
    project_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """데이터 파일 업로드"""
    # 파일 크기 계산
    content = await file.read()
    file_size = len(content)
    size_str = f"{file_size / (1024**3):.2f} GB" if file_size > 1024**3 else f"{file_size / (1024**2):.2f} MB"
    
    # DB에 파일 정보 저장
    db_file = DataFileModel(
        project_id=project_id or 1,  # 기본 프로젝트 ID
        name=file.filename or "uploaded_file",
        size=size_str,
        file_path=None,  # TODO: 실제 파일 저장 경로
    )
    
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    
    return {
        "message": "File uploaded successfully",
        "file": datafile_to_dict(db_file)
    }


@router.delete("/{file_id}")
async def delete_data_file(file_id: int, db: Session = Depends(get_db)):
    """데이터 파일 삭제"""
    data_file = db.query(DataFileModel).filter(DataFileModel.id == file_id).first()
    if not data_file:
        raise HTTPException(status_code=404, detail="Data file not found")
    
    db.delete(data_file)
    db.commit()
    return {"message": "Data file deleted successfully"}

