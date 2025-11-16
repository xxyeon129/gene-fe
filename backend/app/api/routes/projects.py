"""
Projects API routes
"""

from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import Project, ProjectCreate

router = APIRouter()

# Mock data - 실제로는 데이터베이스에서 가져옴
MOCK_PROJECTS = [
    {
        "id": 1,
        "name": "Breast Cancer Analysis",
        "description": "TCGA BRCA 유방암 멀티오믹스 데이터",
        "sampleCount": 1226,
        "fileCount": 3,
        "size": "2.3 GB",
        "status": "진행중",
        "currentStatus": "진행중",
        "createdAt": "2025-10-14",
    },
    {
        "id": 2,
        "name": "Lung Cancer Study",
        "description": "TCGA LUAD/LUSC 폐암 유전체 분석",
        "sampleCount": 892,
        "fileCount": 2,
        "size": "1.8 GB",
        "status": "진행중",
        "currentStatus": "완료",
        "createdAt": "2025-10-13",
    },
    {
        "id": 3,
        "name": "Pan-Cancer Atlas",
        "description": "33개 암종 통합 분석 프로젝트",
        "sampleCount": 10967,
        "fileCount": 5,
        "size": "8.7 GB",
        "status": "진행중",
        "currentStatus": "대기",
        "createdAt": "2025-10-12",
    },
    {
        "id": 4,
        "name": "Glioblastoma Research",
        "description": "GBM 뇌종양 후성유전학 연구",
        "sampleCount": 456,
        "fileCount": 2,
        "size": "980 MB",
        "status": "완료",
        "currentStatus": "완료",
        "createdAt": "2025-10-10",
    },
]


@router.get("/", response_model=List[Project])
async def get_projects():
    """프로젝트 목록 조회"""
    return MOCK_PROJECTS


@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: int):
    """특정 프로젝트 조회"""
    project = next((p for p in MOCK_PROJECTS if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/", response_model=Project)
async def create_project(project: ProjectCreate):
    """새 프로젝트 생성"""
    new_id = max(p["id"] for p in MOCK_PROJECTS) + 1 if MOCK_PROJECTS else 1
    new_project = {
        "id": new_id,
        **project.model_dump(by_alias=True)
    }
    MOCK_PROJECTS.append(new_project)
    return new_project


@router.put("/{project_id}", response_model=Project)
async def update_project(project_id: int, project: ProjectCreate):
    """프로젝트 업데이트"""
    index = next((i for i, p in enumerate(MOCK_PROJECTS) if p["id"] == project_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    MOCK_PROJECTS[index] = {
        "id": project_id,
        **project.model_dump(by_alias=True)
    }
    return MOCK_PROJECTS[index]


@router.delete("/{project_id}")
async def delete_project(project_id: int):
    """프로젝트 삭제"""
    index = next((i for i, p in enumerate(MOCK_PROJECTS) if p["id"] == project_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    MOCK_PROJECTS.pop(index)
    return {"message": "Project deleted successfully"}

