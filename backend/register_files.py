#!/usr/bin/env python3
"""
기존 파일들을 DB에 등록하는 스크립트
"""
import sys
from pathlib import Path
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.base import DataFile

def register_files():
    """project_1의 파일들을 DB에 등록"""
    db = SessionLocal()

    try:
        # 파일 경로
        files_dir = Path("/home/humandeep/data-qc/uploads/project_1/raw")

        files_info = [
            ("BRCA_PAM50.rna.original.tsv", "46 MB"),
            ("BRCA_PAM50.protein.original.tsv", "347 KB"),
            ("BRCA_PAM50.methy.original.tsv", "5.7 MB"),
        ]

        # 기존 파일 확인
        existing_files = db.query(DataFile).filter(DataFile.project_id == 1).all()
        print(f"기존 등록된 파일 수: {len(existing_files)}")

        for filename, size in files_info:
            file_path = files_dir / filename

            if not file_path.exists():
                print(f"❌ 파일이 존재하지 않음: {file_path}")
                continue

            # 이미 등록된 파일인지 확인
            existing = db.query(DataFile).filter(
                DataFile.project_id == 1,
                DataFile.name == filename
            ).first()

            if existing:
                print(f"✓ 이미 등록됨: {filename}")
                continue

            # 새 파일 등록
            new_file = DataFile(
                project_id=1,
                name=filename,
                size=size,
                file_path=str(file_path)
            )

            db.add(new_file)
            print(f"✅ 등록 완료: {filename}")

        db.commit()

        # 최종 확인
        all_files = db.query(DataFile).filter(DataFile.project_id == 1).all()
        print(f"\n총 등록된 파일 수: {len(all_files)}")
        for f in all_files:
            print(f"  - {f.name} ({f.size})")

    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    register_files()
