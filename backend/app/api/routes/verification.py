"""
Verification API routes
"""

from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.models.schemas import (
    VerificationDashboardSample,
    VerificationStatus,
    VerificationRule
)

router = APIRouter()

# Mock data
MOCK_VERIFICATION_DASHBOARD_SAMPLES = [
    {"label": "총 검증 샘플", "count": "1,226", "description": "TCGA BRCA Dataset"},
    {"label": "검증 통과율", "count": "89.3%", "description": "+2.3% from last week"},
    {"label": "경고 샘플", "count": "49", "description": "Requires attention"},
    {"label": "활성 규칙", "count": "4", "description": "Quality control rules"},
]

MOCK_VERIFICATION_STATUS = [
    {"label": "정렬성", "score": 92, "standard": 90},
    {"label": "정밀성", "score": 88, "standard": 85},
    {"label": "완전성", "score": 95, "standard": 90},
    {"label": "타당성", "score": 87, "standard": 85},
    {"label": "일치성", "score": 91, "standard": 88},
]

MOCK_VERIFICATION_RULES = [
    {
        "label": "리드 정렬성",
        "status": "active",
        "category": "정렬성",
        "metric": "read_mapping",
        "condition": ">=",
        "threshold": 90,
    },
    {
        "label": "위양성 SNP calls",
        "status": "active",
        "category": "정렬성",
        "metric": "snp_calls",
        "condition": "<=",
        "threshold": 5,
    },
    {
        "label": "동일 준비 동일 LC-MS",
        "status": "active",
        "category": "정밀성",
        "metric": "consistency",
        "condition": ">=",
        "threshold": 85,
    },
    {
        "label": "기기 안정성",
        "status": "active",
        "category": "완전성",
        "metric": "batch_drift",
        "condition": "<=",
        "threshold": 10,
    },
]


@router.get("/dashboard", response_model=List[VerificationDashboardSample])
async def get_verification_dashboard(project_id: Optional[int] = None):
    """검증 대시보드 데이터 조회"""
    # TODO: project_id에 따라 다른 데이터 반환
    return MOCK_VERIFICATION_DASHBOARD_SAMPLES


@router.get("/status", response_model=List[VerificationStatus])
async def get_verification_status(project_id: Optional[int] = None):
    """검증 상태 데이터 조회"""
    return MOCK_VERIFICATION_STATUS


@router.get("/rules", response_model=List[VerificationRule])
async def get_verification_rules(project_id: Optional[int] = None):
    """검증 규칙 목록 조회"""
    return MOCK_VERIFICATION_RULES


@router.post("/rules", response_model=VerificationRule)
async def create_verification_rule(rule: VerificationRule):
    """새 검증 규칙 생성"""
    MOCK_VERIFICATION_RULES.append(rule.model_dump())
    return rule


@router.put("/rules/{rule_id}", response_model=VerificationRule)
async def update_verification_rule(rule_id: int, rule: VerificationRule):
    """검증 규칙 업데이트"""
    if rule_id >= len(MOCK_VERIFICATION_RULES):
        raise HTTPException(status_code=404, detail="Rule not found")
    
    MOCK_VERIFICATION_RULES[rule_id] = rule.model_dump()
    return rule


@router.delete("/rules/{rule_id}")
async def delete_verification_rule(rule_id: int):
    """검증 규칙 삭제"""
    if rule_id >= len(MOCK_VERIFICATION_RULES):
        raise HTTPException(status_code=404, detail="Rule not found")
    
    MOCK_VERIFICATION_RULES.pop(rule_id)
    return {"message": "Rule deleted successfully"}

