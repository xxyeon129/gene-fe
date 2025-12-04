"""
Missing Value API routes
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from app.models.schemas import (
    MissingValueProject,
    MissingValueAnalysis,
    MissingValueSummary,
    MissingValueDistribution
)
from app.models.base import Project, MissingValue as MissingValueModel
from app.db.session import get_db

router = APIRouter()


@router.get("/projects", response_model=List[MissingValueProject])
async def get_missing_value_projects(db: Session = Depends(get_db)):
    """결측치 보간 가능한 프로젝트 목록 조회"""
    # 결측치 데이터가 있는 프로젝트만 조회
    projects = db.query(Project).join(MissingValueModel).all()
    
    result = []
    for project in projects:
        # 각 프로젝트의 최신 결측치 데이터 가져오기
        missing_value = db.query(MissingValueModel).filter(
            MissingValueModel.project_id == project.id
        ).order_by(MissingValueModel.updated_at.desc()).first()
        
        if missing_value:
            result.append({
                "label": project.name,
                "sampleCount": project.sample_count,
                "currentMissingValueRate": missing_value.total_missing_rate
            })
    
    return result


@router.get("/summary/{project_id}", response_model=MissingValueAnalysis)
async def get_missing_value_analysis(project_id: int, db: Session = Depends(get_db)):
    """프로젝트의 결측치 분석 데이터 조회"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    missing_value = db.query(MissingValueModel).filter(
        MissingValueModel.project_id == project_id
    ).order_by(MissingValueModel.updated_at.desc()).first()
    
    if not missing_value:
        raise HTTPException(status_code=404, detail="Missing value data not found")
    
    # 요약 데이터 생성
    summary = [
        {
            "type": "all",
            "title": "전체 결측률",
            "value": missing_value.total_missing_rate,
            "description": f"{missing_value.total_cells:,} cells"
        },
        {
            "type": "sample",
            "title": "결측 샘플",
            "value": missing_value.missing_sample_count,
            "description": f"/ {project.sample_count:,} samples"
        },
        {
            "type": "gene",
            "title": "결측 유전자",
            "value": missing_value.missing_gene_count,
            "description": "features with missing values"
        },
    ]
    
    # 분포 데이터 추출
    distribution = []
    if missing_value.distribution_data and "ranges" in missing_value.distribution_data:
        distribution = missing_value.distribution_data["ranges"]
    
    return {
        "summary": summary,
        "distribution": distribution
    }


@router.get("/summary/{project_id}/summary", response_model=List[MissingValueSummary])
async def get_missing_value_summary(project_id: int, db: Session = Depends(get_db)):
    """프로젝트의 결측치 요약 데이터 조회"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    missing_value = db.query(MissingValueModel).filter(
        MissingValueModel.project_id == project_id
    ).order_by(MissingValueModel.updated_at.desc()).first()
    
    if not missing_value:
        raise HTTPException(status_code=404, detail="Missing value data not found")
    
    return [
        {
            "type": "all",
            "title": "전체 결측률",
            "value": missing_value.total_missing_rate,
            "description": f"{missing_value.total_cells:,} cells"
        },
        {
            "type": "sample",
            "title": "결측 샘플",
            "value": missing_value.missing_sample_count,
            "description": f"/ {project.sample_count:,} samples"
        },
        {
            "type": "gene",
            "title": "결측 유전자",
            "value": missing_value.missing_gene_count,
            "description": "features with missing values"
        },
    ]


@router.get("/summary/{project_id}/distribution", response_model=List[MissingValueDistribution])
async def get_missing_value_distribution(project_id: int, db: Session = Depends(get_db)):
    """프로젝트의 결측치 분포 데이터 조회"""
    missing_value = db.query(MissingValueModel).filter(
        MissingValueModel.project_id == project_id
    ).order_by(MissingValueModel.updated_at.desc()).first()
    
    if not missing_value:
        raise HTTPException(status_code=404, detail="Missing value data not found")
    
    if missing_value.distribution_data and "ranges" in missing_value.distribution_data:
        return missing_value.distribution_data["ranges"]
    
    return []

