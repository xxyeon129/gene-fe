"""
Projects API routes
"""

from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import Project, ProjectCreate

router = APIRouter()

# Mock data - TODO: DB에서 가져오기
MOCK_PROJECTS = [
    {
        "id": 1,
        # 메인 페이지
        "name": "🧬 암 유전체 프로젝트",
        "dataType": ["전사체", "대사체"],
        "qualityScore": 95.8,
        "validationStatus": "검증완료",
        "lastUpdate": "10분 전",
        # 데이터셋 페이지
        "description": "대규모 암 유전체 데이터 분석",
        "sampleCount": 450,
        "status": "활성",
        # 품질검증 페이지
        "DNA_qualityScore": 99,
        "RNA_qualityScore": 80,
        "Protein_qualityScore": 75,
        "sample_accuracy": 98.5,
        # "createdAt": "2025-10-14",
    },
    {
        "id": 2,
        # 메인 페이지
        "name": "🔬 알츠하이머 연구",
        "dataType": ["메틸화", "전사체"],
        "qualityScore": 87.2,
        "validationStatus": "처리중",
        "lastUpdate": "3시간 전",
        # 데이터셋 페이지
        "description": "신경퇴행성 질환 바이오마커 발굴",
        "sampleCount": 280,
        "status": "활성",
        # 품질검증 페이지
        "DNA_qualityScore": 98,
        "RNA_qualityScore": 70,
        "Protein_qualityScore": 65,
        "sample_accuracy": 100,
        # "createdAt": "2025-10-14",
    },
    
    {
        "id": 3,
        # 메인 페이지
        "name": "🧪 심혈관 질환 코호트",
        "dataType": ["대사체", "전체 오믹스"],
        "qualityScore": 92.4,
        "validationStatus": "검증완료",
        "lastUpdate": "3일 전",
        # 데이터셋 페이지
        "description": "다중 오믹스 통합 분석",
        "sampleCount": 620,
        "status": "활성",
        # 품질검증 페이지
        "DNA_qualityScore": 88,
        "RNA_qualityScore": 90,
        "Protein_qualityScore": 95,
        "sample_accuracy": 99.2,
        # "createdAt": "2025-10-14",
    },
]


@router.get("", response_model=List[Project])
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


@router.post("", response_model=Project)
async def create_project(project: ProjectCreate):
    """새 프로젝트 생성"""
    new_id = max(p["id"] for p in MOCK_PROJECTS) + 1 if MOCK_PROJECTS else 1
    new_project = {
        "id": new_id,
        **project.model_dump(by_alias=True),
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

