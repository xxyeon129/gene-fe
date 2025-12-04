"""
SQLAlchemy Base and Model Definitions
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()


class Project(Base):
    """프로젝트 모델"""
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    data_type = Column(JSON, nullable=False, default=list)  # ["전사체", "대사체"] 등
    quality_score = Column(Float, default=0.0)
    validation_status = Column(String(50), default="작성중")  # 작성중, 처리중, 검증완료
    last_update = Column(String(100), default="방금 전")
    sample_count = Column(Integer, default=0)
    status = Column(String(50), default="활성")  # 활성, 비활성, 완료
    
    # 품질 점수들
    dna_quality_score = Column(Float, nullable=True)
    rna_quality_score = Column(Float, nullable=True)
    protein_quality_score = Column(Float, nullable=True)
    sample_accuracy = Column(Float, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    data_files = relationship("DataFile", back_populates="project", cascade="all, delete-orphan")
    missing_values = relationship("MissingValue", back_populates="project", cascade="all, delete-orphan")
    verification_rules = relationship("VerificationRule", back_populates="project", cascade="all, delete-orphan")


class DataFile(Base):
    """데이터 파일 모델"""
    __tablename__ = "data_files"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    name = Column(String(255), nullable=False)
    size = Column(String(50), nullable=True)  # "1.2 GB", "856 MB" 등
    file_path = Column(String(500), nullable=True)  # 실제 파일 저장 경로
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="data_files")


class MissingValue(Base):
    """결측치 분석 모델"""
    __tablename__ = "missing_values"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    
    # 결측치 통계
    total_missing_rate = Column(Float, default=0.0)  # 전체 결측률
    missing_sample_count = Column(Integer, default=0)  # 결측 샘플 수
    missing_gene_count = Column(Integer, default=0)  # 결측 유전자 수
    total_cells = Column(Integer, default=0)  # 총 셀 수
    
    # 분포 데이터 (JSON 형태로 저장)
    distribution_data = Column(JSON, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="missing_values")


class VerificationRule(Base):
    """검증 규칙 모델"""
    __tablename__ = "verification_rules"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)  # NULL이면 전역 규칙
    
    label = Column(String(255), nullable=False)
    status = Column(String(20), default="active")  # active, inactive
    category = Column(String(50), nullable=False)  # 정렬성, 정밀성, 완전성
    metric = Column(String(100), nullable=False)  # read_mapping, snp_calls 등
    condition = Column(String(10), nullable=False)  # >=, <=
    threshold = Column(Integer, nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    project = relationship("Project", back_populates="verification_rules")


class VerificationStatus(Base):
    """검증 상태 모델"""
    __tablename__ = "verification_status"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    
    label = Column(String(100), nullable=False)  # 정렬성, 정밀성 등
    score = Column(Integer, nullable=False)
    standard = Column(Integer, nullable=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ImputationJob(Base):
    """보간 작업 모델"""
    __tablename__ = "imputation_jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String(100), unique=True, nullable=False, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    
    method = Column(String(50), nullable=False)  # mochi, knn, mice 등
    threshold = Column(Float, default=30.0)
    quality_threshold = Column(Float, default=85.0)
    options = Column(JSON, nullable=True)
    
    status = Column(String(50), default="processing")  # processing, completed, failed
    progress = Column(Float, default=0.0)
    
    # 결과 데이터
    imputed_samples = Column(Integer, nullable=True)
    imputed_features = Column(Integer, nullable=True)
    quality_score = Column(Float, nullable=True)
    output_file = Column(String(500), nullable=True)
    
    error_message = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
