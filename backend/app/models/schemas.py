"""
Pydantic schemas for request/response models
"""

from typing import Optional, List, Literal
from pydantic import BaseModel, Field
from datetime import datetime


# Project Models
class ProjectBase(BaseModel):
    name: str
    description: str
    sample_count: int = Field(..., alias="sampleCount")
    file_count: int = Field(..., alias="fileCount")
    size: str
    status: str
    current_status: str = Field(..., alias="currentStatus")
    created_at: str = Field(..., alias="createdAt")


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int

    class Config:
        populate_by_name = True


# Data Models
class DataFileBase(BaseModel):
    name: str
    size: str
    created_at: str = Field(..., alias="createdAt")


class DataFileCreate(DataFileBase):
    pass


class DataFile(DataFileBase):
    id: int

    class Config:
        populate_by_name = True


# Missing Value Models
class MissingValueProject(BaseModel):
    label: str
    sample_count: int = Field(..., alias="sampleCount")
    current_missing_value_rate: float = Field(..., alias="currentMissingValueRate")


class MissingValueSummary(BaseModel):
    type: Literal["all", "sample", "gene"]
    title: str
    value: float
    description: str


class MissingValueDistribution(BaseModel):
    range: Literal["0-10%", "10-20%", "20-30%", "30-50%", "50%+"]
    sample_count: int = Field(..., alias="sampleCount")
    gene_count: int = Field(..., alias="geneCount")


class MissingValueAnalysis(BaseModel):
    summary: List[MissingValueSummary]
    distribution: List[MissingValueDistribution]


# Verification Models
class VerificationDashboardSample(BaseModel):
    label: str
    count: str
    description: str


class VerificationStatus(BaseModel):
    label: str
    score: int
    standard: int


class VerificationRule(BaseModel):
    label: str
    status: Literal["active", "inactive"]
    category: Literal["정렬성", "정밀성", "완전성"]
    metric: str
    condition: Literal[">=", "<="]
    threshold: int


# Imputation Models
class ImputationMethod(BaseModel):
    value: str
    label: str
    description: Optional[str] = None
    accuracy: Optional[str] = None


class ImputationRequest(BaseModel):
    project_id: int = Field(..., alias="projectId")
    method: str
    threshold: float = 30.0
    quality_threshold: float = 85.0
    options: Optional[dict] = None


class ImputationResponse(BaseModel):
    job_id: str = Field(..., alias="jobId")
    status: str
    message: str
    estimated_time: Optional[int] = Field(None, alias="estimatedTime")


# Statistics Models
class DashboardStats(BaseModel):
    active_projects: int = Field(..., alias="activeProjects")
    avg_quality: str = Field(..., alias="avgQuality")
    processed_datasets: int = Field(..., alias="processedDatasets")
    avg_missing_rate: str = Field(..., alias="avgMissingRate")

