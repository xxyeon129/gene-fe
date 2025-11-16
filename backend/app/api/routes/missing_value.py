"""
Missing Value API routes
"""

from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import (
    MissingValueProject,
    MissingValueAnalysis,
    MissingValueSummary,
    MissingValueDistribution
)

router = APIRouter()

# Mock data
MOCK_MISSING_VALUE_PROJECTS = [
    {"label": "Breast Cancer Imputation", "sampleCount": 1226, "currentMissingValueRate": 18.7},
    {"label": "Lung Cancer QC", "sampleCount": 892, "currentMissingValueRate": 12.3},
    {"label": "TCGA Pan-Cancer", "sampleCount": 5420, "currentMissingValueRate": 25.6},
]

MOCK_MISSING_VALUE_SUMMARY = [
    {"type": "all", "title": "전체 결측률", "value": 18.7, "description": "13,876,348 cells"},
    {"type": "sample", "title": "결측 샘플", "value": 156, "description": "/ 1,226 samples"},
    {"type": "gene", "title": "결측 유전자", "value": 4523, "description": "features with missing values"},
]

MOCK_MISSING_VALUE_DISTRIBUTION = [
    {"range": "0-10%", "sampleCount": 645, "geneCount": 42135},
    {"range": "10-20%", "sampleCount": 289, "geneCount": 12458},
    {"range": "20-30%", "sampleCount": 136, "geneCount": 3867},
    {"range": "30-50%", "sampleCount": 98, "geneCount": 1845},
    {"range": "50%+", "sampleCount": 58, "geneCount": 678},
]


@router.get("/projects", response_model=List[MissingValueProject])
async def get_missing_value_projects():
    """결측치 보간 가능한 프로젝트 목록 조회"""
    return MOCK_MISSING_VALUE_PROJECTS


@router.get("/summary/{project_id}", response_model=MissingValueAnalysis)
async def get_missing_value_analysis(project_id: int):
    """프로젝트의 결측치 분석 데이터 조회"""
    # TODO: project_id에 따라 다른 데이터 반환
    return {
        "summary": MOCK_MISSING_VALUE_SUMMARY,
        "distribution": MOCK_MISSING_VALUE_DISTRIBUTION
    }


@router.get("/summary/{project_id}/summary", response_model=List[MissingValueSummary])
async def get_missing_value_summary(project_id: int):
    """프로젝트의 결측치 요약 데이터 조회"""
    return MOCK_MISSING_VALUE_SUMMARY


@router.get("/summary/{project_id}/distribution", response_model=List[MissingValueDistribution])
async def get_missing_value_distribution(project_id: int):
    """프로젝트의 결측치 분포 데이터 조회"""
    return MOCK_MISSING_VALUE_DISTRIBUTION

