#!/usr/bin/env python3
"""
MySQL 연결 테스트 스크립트
"""

import pymysql

# 연결 정보
config = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'password': 'Mysql1234',
    'database': 'data_qc',
    'charset': 'utf8mb4'
}

print("=" * 60)
print("MySQL 연결 테스트")
print("=" * 60)
print(f"호스트: {config['host']}:{config['port']}")
print(f"사용자: {config['user']}")
print(f"데이터베이스: {config['database']}")
print(f"비밀번호: {'설정됨' if config['password'] else '빈 문자열'}")
print("=" * 60)
print()

try:
    # MySQL 연결 시도
    print("1. MySQL 연결 시도 중...")
    connection = pymysql.connect(**config)
    print("✅ MySQL 연결 성공!")
    print()
    
    # 커서 생성
    cursor = connection.cursor()
    
    # 테이블 목록 조회
    print("2. 테이블 목록 조회 중...")
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    print(f"✅ 테이블 {len(tables)}개 발견:")
    for table in tables:
        print(f"   - {table[0]}")
    print()
    
    # projects 테이블 확인
    print("3. projects 테이블 데이터 확인 중...")
    cursor.execute("SELECT COUNT(*) FROM projects")
    count = cursor.fetchone()[0]
    print(f"✅ projects 테이블에 {count}개의 레코드가 있습니다.")
    
    if count > 0:
        cursor.execute("SELECT id, name, sample_count FROM projects LIMIT 3")
        projects = cursor.fetchall()
        print("\n최근 프로젝트:")
        for p in projects:
            print(f"   - ID: {p[0]}, 이름: {p[1]}, 샘플 수: {p[2]}")
    print()
    
    # 연결 종료
    cursor.close()
    connection.close()
    
    print("=" * 60)
    print("✅ 모든 테스트 통과! DB 연결이 정상입니다.")
    print("=" * 60)
    
except pymysql.err.OperationalError as e:
    print(f"❌ MySQL 연결 실패: {e}")
    print()
    print("다음 사항을 확인해주세요:")
    print("1. MySQL 서버가 실행 중인가?")
    print("2. 비밀번호가 정확한가?")
    print("3. data_qc 데이터베이스가 생성되었는가?")
    print()
    print("비밀번호가 다르다면 config의 'password' 값을 변경하세요.")
    
except Exception as e:
    print(f"❌ 예상치 못한 오류: {e}")
    import traceback
    traceback.print_exc()

