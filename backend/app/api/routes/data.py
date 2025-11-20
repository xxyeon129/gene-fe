"""
Data management API routes
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List, Optional
from app.models.schemas import DataFile, DataFileCreate

router = APIRouter()

# Mock data - 실제로는 데이터베이스에서 가져옴
MOCK_DATA_FILES = [
    {
        "id": 101,
        "name": "BRCA_RNA_seq.tsv",
        "size": "1.2 GB",
        "createdAt": "2025-10-10",
    },
    {
        "id": 102,
        "name": "BRCA_DNA_methylation.csv",
        "size": "856 MB",
        "createdAt": "2025-10-11",
    },
    {
        "id": 103,
        "name": "BRCA_protein.tsv",
        "size": "234 MB",
        "createdAt": "2025-10-12",
    },
]


@router.get("", response_model=List[DataFile])
async def get_data_files(project_id: Optional[int] = None):
    """데이터 파일 목록 조회"""
    # TODO: project_id로 필터링 기능 추가
    return MOCK_DATA_FILES


@router.get("/{file_id}", response_model=DataFile)
async def get_data_file(file_id: int):
    """특정 데이터 파일 조회"""
    file = next((f for f in MOCK_DATA_FILES if f["id"] == file_id), None)
    if not file:
        raise HTTPException(status_code=404, detail="Data file not found")
    return file


@router.post("/upload")
async def upload_data_file(
    file: UploadFile = File(...),
    project_id: Optional[int] = None
):
    """데이터 파일 업로드"""
    # TODO: 실제 파일 저장 로직 구현
    # 현재는 mock 데이터로 응답
    from datetime import datetime
    
    # 파일 크기 계산 (실제로는 파일을 읽어서 계산)
    content = await file.read()
    file_size = len(content)
    size_str = f"{file_size / (1024**3):.2f} GB" if file_size > 1024**3 else f"{file_size / (1024**2):.2f} MB"
    
    new_id = max(f["id"] for f in MOCK_DATA_FILES) + 1 if MOCK_DATA_FILES else 1
    new_file = {
        "id": new_id,
        "name": file.filename or "uploaded_file",
        "size": size_str,
        "createdAt": datetime.now().strftime("%Y-%m-%d"),
    }
    MOCK_DATA_FILES.append(new_file)
    
    return {
        "message": "File uploaded successfully",
        "file": new_file
    }


@router.delete("/{file_id}")
async def delete_data_file(file_id: int):
    """데이터 파일 삭제"""
    index = next((i for i, f in enumerate(MOCK_DATA_FILES) if f["id"] == file_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Data file not found")
    
    MOCK_DATA_FILES.pop(index)
    return {"message": "Data file deleted successfully"}

