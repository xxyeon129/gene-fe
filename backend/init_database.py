#!/usr/bin/env python3
"""
데이터베이스 초기화 스크립트
"""

import sys
import os

# 현재 디렉토리를 Python 경로에 추가
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db.init_db import init_db, seed_data
from app.db.session import SessionLocal

if __name__ == "__main__":
    print("=" * 60)
    print("GENE-Q Database Initialization")
    print("=" * 60)
    print()
    
    # 테이블 생성
    init_db()
    print()
    
    # 샘플 데이터 생성
    db = SessionLocal()
    try:
        seed_data(db)
    finally:
        db.close()
    
    print()
    print("=" * 60)
    print("Database initialization completed!")
    print("=" * 60)

