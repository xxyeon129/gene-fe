"""
데이터베이스 초기화 및 샘플 데이터 생성
"""

from app.db.session import engine
from app.models.base import Base, Project, DataFile, MissingValue, VerificationRule, VerificationStatus
from sqlalchemy.orm import Session
from datetime import datetime


def init_db():
    """데이터베이스 테이블 생성"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")


def seed_data(db: Session):
    """샘플 데이터 생성"""
    print("Seeding sample data...")
    
    # 기존 프로젝트가 있는지 확인
    existing_projects = db.query(Project).count()
    if existing_projects > 0:
        print(f"Database already has {existing_projects} projects. Skipping seed.")
        return
    
    # 프로젝트 생성
    projects = [
        Project(
            id=1,
            name="🧬 암 유전체 프로젝트",
            description="대규모 암 유전체 데이터 분석",
            data_type=["전사체", "대사체"],
            quality_score=95.8,
            validation_status="검증완료",
            last_update="10분 전",
            sample_count=450,
            status="활성",
            dna_quality_score=99.0,
            rna_quality_score=80.0,
            protein_quality_score=75.0,
            sample_accuracy=98.5,
        ),
        Project(
            id=2,
            name="🔬 알츠하이머 연구",
            description="신경퇴행성 질환 바이오마커 발굴",
            data_type=["메틸화", "전사체"],
            quality_score=87.2,
            validation_status="처리중",
            last_update="3시간 전",
            sample_count=280,
            status="활성",
            dna_quality_score=98.0,
            rna_quality_score=70.0,
            protein_quality_score=65.0,
            sample_accuracy=100.0,
        ),
        Project(
            id=3,
            name="🧪 심혈관 질환 코호트",
            description="다중 오믹스 통합 분석",
            data_type=["대사체", "전체 오믹스"],
            quality_score=92.4,
            validation_status="검증완료",
            last_update="3일 전",
            sample_count=620,
            status="활성",
            dna_quality_score=88.0,
            rna_quality_score=90.0,
            protein_quality_score=95.0,
            sample_accuracy=99.2,
        ),
    ]
    
    db.add_all(projects)
    db.commit()
    
    # 데이터 파일 생성
    data_files = [
        DataFile(
            id=101,
            project_id=1,
            name="BRCA_RNA_seq.tsv",
            size="1.2 GB",
        ),
        DataFile(
            id=102,
            project_id=1,
            name="BRCA_DNA_methylation.csv",
            size="856 MB",
        ),
        DataFile(
            id=103,
            project_id=1,
            name="BRCA_protein.tsv",
            size="234 MB",
        ),
    ]
    
    db.add_all(data_files)
    db.commit()
    
    # 결측치 데이터 생성
    missing_values = [
        MissingValue(
            project_id=1,
            total_missing_rate=18.7,
            missing_sample_count=156,
            missing_gene_count=4523,
            total_cells=13876348,
            distribution_data={
                "ranges": [
                    {"range": "0-10%", "sampleCount": 645, "geneCount": 42135},
                    {"range": "10-20%", "sampleCount": 289, "geneCount": 12458},
                    {"range": "20-30%", "sampleCount": 136, "geneCount": 3867},
                    {"range": "30-50%", "sampleCount": 98, "geneCount": 1845},
                    {"range": "50%+", "sampleCount": 58, "geneCount": 678},
                ]
            }
        ),
        MissingValue(
            project_id=2,
            total_missing_rate=12.3,
            missing_sample_count=98,
            missing_gene_count=2890,
            total_cells=8920000,
            distribution_data={
                "ranges": [
                    {"range": "0-10%", "sampleCount": 500, "geneCount": 35000},
                    {"range": "10-20%", "sampleCount": 200, "geneCount": 8500},
                    {"range": "20-30%", "sampleCount": 100, "geneCount": 2800},
                    {"range": "30-50%", "sampleCount": 60, "geneCount": 1200},
                    {"range": "50%+", "sampleCount": 32, "geneCount": 390},
                ]
            }
        ),
        MissingValue(
            project_id=3,
            total_missing_rate=25.6,
            missing_sample_count=280,
            missing_gene_count=6800,
            total_cells=54200000,
            distribution_data={
                "ranges": [
                    {"range": "0-10%", "sampleCount": 800, "geneCount": 50000},
                    {"range": "10-20%", "sampleCount": 400, "geneCount": 18000},
                    {"range": "20-30%", "sampleCount": 200, "geneCount": 5500},
                    {"range": "30-50%", "sampleCount": 150, "geneCount": 2800},
                    {"range": "50%+", "sampleCount": 70, "geneCount": 1000},
                ]
            }
        ),
    ]
    
    db.add_all(missing_values)
    db.commit()
    
    # 검증 규칙 생성 (전역 규칙)
    verification_rules = [
        VerificationRule(
            project_id=None,
            label="리드 정렬성",
            status="active",
            category="정렬성",
            metric="read_mapping",
            condition=">=",
            threshold=90,
        ),
        VerificationRule(
            project_id=None,
            label="위양성 SNP calls",
            status="active",
            category="정렬성",
            metric="snp_calls",
            condition="<=",
            threshold=5,
        ),
        VerificationRule(
            project_id=None,
            label="동일 준비 동일 LC-MS",
            status="active",
            category="정밀성",
            metric="consistency",
            condition=">=",
            threshold=85,
        ),
        VerificationRule(
            project_id=None,
            label="기기 안정성",
            status="active",
            category="완전성",
            metric="batch_drift",
            condition="<=",
            threshold=10,
        ),
    ]
    
    db.add_all(verification_rules)
    db.commit()
    
    # 검증 상태 생성
    verification_statuses = [
        VerificationStatus(project_id=1, label="정렬성", score=92, standard=90),
        VerificationStatus(project_id=1, label="정밀성", score=88, standard=85),
        VerificationStatus(project_id=1, label="완전성", score=95, standard=90),
        VerificationStatus(project_id=1, label="타당성", score=87, standard=85),
        VerificationStatus(project_id=1, label="일치성", score=91, standard=88),
    ]
    
    db.add_all(verification_statuses)
    db.commit()
    
    print(f"Created {len(projects)} projects")
    print(f"Created {len(data_files)} data files")
    print(f"Created {len(missing_values)} missing value records")
    print(f"Created {len(verification_rules)} verification rules")
    print(f"Created {len(verification_statuses)} verification statuses")
    print("Sample data seeded successfully!")


if __name__ == "__main__":
    from app.db.session import SessionLocal
    
    # 테이블 생성
    init_db()
    
    # 샘플 데이터 생성
    db = SessionLocal()
    try:
        seed_data(db)
    finally:
        db.close()

