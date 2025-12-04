"""
Verification API routes
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.schemas import (
    VerificationDashboardSample,
    VerificationStatus as VerificationStatusSchema,
    VerificationRule as VerificationRuleSchema
)
from app.models.base import (
    Project,
    VerificationRule as VerificationRuleModel,
    VerificationStatus as VerificationStatusModel
)
from app.db.session import get_db

router = APIRouter()


@router.get("/dashboard", response_model=List[VerificationDashboardSample])
async def get_verification_dashboard(project_id: Optional[int] = None, db: Session = Depends(get_db)):
    """검증 대시보드 데이터 조회"""
    if project_id:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        
        # 활성 규칙 수 계산
        active_rules = db.query(VerificationRuleModel).filter(
            VerificationRuleModel.status == "active"
        ).filter(
            (VerificationRuleModel.project_id == project_id) | (VerificationRuleModel.project_id.is_(None))
        ).count()
        
        # 검증 상태 계산
        statuses = db.query(VerificationStatusModel).filter(
            VerificationStatusModel.project_id == project_id
        ).all()
        
        passed_count = sum(1 for s in statuses if s.score >= s.standard)
        pass_rate = (passed_count / len(statuses) * 100) if statuses else 0
        warning_count = sum(1 for s in statuses if s.score < s.standard)
        
        return [
            {"label": "총 검증 샘플", "count": f"{project.sample_count:,}", "description": project.name},
            {"label": "검증 통과율", "count": f"{pass_rate:.1f}%", "description": "Quality metrics passed"},
            {"label": "경고 샘플", "count": str(warning_count), "description": "Requires attention"},
            {"label": "활성 규칙", "count": str(active_rules), "description": "Quality control rules"},
        ]
    
    # project_id가 없으면 전체 통계
    total_samples = db.query(Project).with_entities(Project.sample_count).all()
    total = sum(s[0] for s in total_samples if s[0])
    active_rules = db.query(VerificationRuleModel).filter(
        VerificationRuleModel.status == "active"
    ).count()
    
    return [
        {"label": "총 검증 샘플", "count": f"{total:,}", "description": "All projects"},
        {"label": "검증 통과율", "count": "89.3%", "description": "+2.3% from last week"},
        {"label": "경고 샘플", "count": "49", "description": "Requires attention"},
        {"label": "활성 규칙", "count": str(active_rules), "description": "Quality control rules"},
    ]


@router.get("/status", response_model=List[VerificationStatusSchema])
async def get_verification_status(project_id: Optional[int] = None, db: Session = Depends(get_db)):
    """검증 상태 데이터 조회"""
    if not project_id:
        # 기본값으로 첫 번째 프로젝트 사용
        project = db.query(Project).first()
        if project:
            project_id = project.id
    
    if project_id:
        statuses = db.query(VerificationStatusModel).filter(
            VerificationStatusModel.project_id == project_id
        ).all()
        
        return [
            {
                "label": s.label,
                "score": s.score,
                "standard": s.standard
            }
            for s in statuses
        ]
    
    return []


@router.get("/rules", response_model=List[VerificationRuleSchema])
async def get_verification_rules(project_id: Optional[int] = None, db: Session = Depends(get_db)):
    """검증 규칙 목록 조회"""
    query = db.query(VerificationRuleModel)
    
    if project_id:
        # 특정 프로젝트의 규칙 + 전역 규칙
        query = query.filter(
            (VerificationRuleModel.project_id == project_id) | (VerificationRuleModel.project_id.is_(None))
        )
    else:
        # 전역 규칙만
        query = query.filter(VerificationRuleModel.project_id.is_(None))
    
    rules = query.all()
    
    return [
        {
            "label": r.label,
            "status": r.status,
            "category": r.category,
            "metric": r.metric,
            "condition": r.condition,
            "threshold": r.threshold
        }
        for r in rules
    ]


@router.post("/rules", response_model=VerificationRuleSchema)
async def create_verification_rule(rule: VerificationRuleSchema, db: Session = Depends(get_db)):
    """새 검증 규칙 생성"""
    db_rule = VerificationRuleModel(
        label=rule.label,
        status=rule.status,
        category=rule.category,
        metric=rule.metric,
        condition=rule.condition,
        threshold=rule.threshold,
        project_id=None  # 전역 규칙으로 생성
    )
    db.add(db_rule)
    db.commit()
    db.refresh(db_rule)
    
    return {
        "label": db_rule.label,
        "status": db_rule.status,
        "category": db_rule.category,
        "metric": db_rule.metric,
        "condition": db_rule.condition,
        "threshold": db_rule.threshold
    }


@router.put("/rules/{rule_id}", response_model=VerificationRuleSchema)
async def update_verification_rule(rule_id: int, rule: VerificationRuleSchema, db: Session = Depends(get_db)):
    """검증 규칙 업데이트"""
    db_rule = db.query(VerificationRuleModel).filter(VerificationRuleModel.id == rule_id).first()
    if not db_rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    
    db_rule.label = rule.label
    db_rule.status = rule.status
    db_rule.category = rule.category
    db_rule.metric = rule.metric
    db_rule.condition = rule.condition
    db_rule.threshold = rule.threshold
    
    db.commit()
    db.refresh(db_rule)
    
    return {
        "label": db_rule.label,
        "status": db_rule.status,
        "category": db_rule.category,
        "metric": db_rule.metric,
        "condition": db_rule.condition,
        "threshold": db_rule.threshold
    }


@router.delete("/rules/{rule_id}")
async def delete_verification_rule(rule_id: int, db: Session = Depends(get_db)):
    """검증 규칙 삭제"""
    db_rule = db.query(VerificationRuleModel).filter(VerificationRuleModel.id == rule_id).first()
    if not db_rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    
    db.delete(db_rule)
    db.commit()
    return {"message": "Rule deleted successfully"}

