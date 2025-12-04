"""
Dashboard API routes
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.schemas import DashboardStats
from app.models.base import Project, MissingValue
from app.db.session import get_db

router = APIRouter()


@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(db: Session = Depends(get_db)):
    """대시보드 통계 데이터 조회"""
    
    # 활성 프로젝트 수
    active_projects = db.query(Project).filter(Project.status == "활성").count()
    
    # 평균 품질 점수
    projects = db.query(Project).all()
    if projects:
        avg_quality = sum(p.quality_score for p in projects) / len(projects)
    else:
        avg_quality = 0.0
    
    # 처리된 데이터셋 수 (검증완료 상태인 프로젝트)
    processed_datasets = db.query(Project).filter(
        Project.validation_status == "검증완료"
    ).count()
    
    # 평균 결측률
    missing_values = db.query(MissingValue).all()
    if missing_values:
        avg_missing_rate = sum(mv.total_missing_rate for mv in missing_values) / len(missing_values)
    else:
        avg_missing_rate = 0.0
    
    return {
        "activeProjects": active_projects,
        "avgQuality": f"{avg_quality:.1f}%",
        "processedDatasets": processed_datasets,
        "avgMissingRate": f"{avg_missing_rate:.1f}%"
    }

