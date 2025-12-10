# GENE-Q Backend API

FastAPI 기반 백엔드 서버로, GENE-Q 프론트엔드와 통신하며 데이터 품질 관리 및 결측치 보간 기능을 제공합니다.

## 주요 기능

- 프로젝트 관리 API
- 데이터 파일 업로드/관리 API

## MySQL 데이터베이스 설정

이 프로젝트는 MySQL 데이터베이스를 사용합니다.

### 1. MySQL 서버 설치 및 실행

MySQL이 설치되어 있어야 합니다. 설치되지 않은 경우:

```bash
# macOS (Homebrew)
brew install mysql
brew services start mysql

# Ubuntu/Debian
sudo apt install mysql-server
sudo systemctl start mysql

# Windows
# MySQL 공식 웹사이트에서 설치 프로그램 다운로드
```

### 2. 데이터베이스 생성

MySQL에 접속하여 `gene_q` 데이터베이스를 생성합니다:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE data_qc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 기존 테이블이 있다면 삭제 (선택사항)
-- DROP TABLE IF EXISTS imputation_jobs;
-- DROP TABLE IF EXISTS verification_status;
-- DROP TABLE IF EXISTS verification_rules;
-- DROP TABLE IF EXISTS missing_values;
-- DROP TABLE IF EXISTS data_files;
-- DROP TABLE IF EXISTS projects;

-- 1. projects 테이블
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    data_type JSON NOT NULL,
    quality_score FLOAT DEFAULT 0.0,
    validation_status VARCHAR(50) DEFAULT '작성중',
    last_update VARCHAR(100) DEFAULT '방금 전',
    sample_count INT DEFAULT 0,
    status VARCHAR(50) DEFAULT '활성',
    dna_quality_score FLOAT,
    rna_quality_score FLOAT,
    protein_quality_score FLOAT,
    sample_accuracy FLOAT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. data_files 테이블
CREATE TABLE IF NOT EXISTS data_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    size VARCHAR(50),
    file_path VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project (project_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. missing_values 테이블
CREATE TABLE IF NOT EXISTS missing_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    total_missing_rate FLOAT DEFAULT 0.0,
    missing_sample_count INT DEFAULT 0,
    missing_gene_count INT DEFAULT 0,
    total_cells INT DEFAULT 0,
    distribution_data JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project (project_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. verification_rules 테이블
CREATE TABLE IF NOT EXISTS verification_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    label VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    category VARCHAR(50) NOT NULL,
    metric VARCHAR(100) NOT NULL,
    `condition` VARCHAR(10) NOT NULL,
    threshold INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project (project_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. verification_status 테이블
CREATE TABLE IF NOT EXISTS verification_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    label VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    standard INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_project (project_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. imputation_jobs 테이블
CREATE TABLE IF NOT EXISTS imputation_jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id VARCHAR(100) UNIQUE NOT NULL,
    project_id INT NOT NULL,
    method VARCHAR(50) NOT NULL,
    threshold FLOAT DEFAULT 30.0,
    quality_threshold FLOAT DEFAULT 85.0,
    options JSON,
    status VARCHAR(50) DEFAULT 'processing',
    progress FLOAT DEFAULT 0.0,
    imputed_samples INT,
    imputed_features INT,
    quality_score FLOAT,
    output_file VARCHAR(500),
    error_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_job_id (job_id),
    INDEX idx_project (project_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 샘플 데이터 삽입
INSERT INTO projects (id, name, description, data_type, quality_score, validation_status, last_update, sample_count, status, dna_quality_score, rna_quality_score, protein_quality_score, sample_accuracy)
VALUES
(1, 'SAMPLE 🧬 암 유전체 프로젝트', '대규모 암 유전체 데이터 분석', '["전사체", "대사체"]', 95.8, '검증완료', '10분 전', 450, '활성', 99.0, 80.0, 75.0, 98.5),
(2, 'SAMPLE 🔬 알츠하이머 연구', '신경퇴행성 질환 바이오마커 발굴', '["메틸화", "전사체"]', 87.2, '처리중', '3시간 전', 280, '활성', 98.0, 70.0, 65.0, 100.0),
(3, 'SAMPLE 🧪 심혈관 질환 코호트', '다중 오믹스 통합 분석', '["대사체", "전체 오믹스"]', 92.4, '검증완료', '3일 전', 620, '활성', 88.0, 90.0, 95.0, 99.2);

-- 데이터 파일 샘플
INSERT INTO data_files (id, project_id, name, size)
VALUES
(101, 1, 'BRCA_RNA_seq.tsv', '1.2 GB'),
(102, 1, 'BRCA_DNA_methylation.csv', '856 MB'),
(103, 1, 'BRCA_protein.tsv', '234 MB');

-- 결측치 데이터 샘플
INSERT INTO missing_values (project_id, total_missing_rate, missing_sample_count, missing_gene_count, total_cells, distribution_data)
VALUES
(1, 18.7, 156, 4523, 13876348, '{"ranges": [{"range": "0-10%", "sampleCount": 645, "geneCount": 42135}, {"range": "10-20%", "sampleCount": 289, "geneCount": 12458}, {"range": "20-30%", "sampleCount": 136, "geneCount": 3867}, {"range": "30-50%", "sampleCount": 98, "geneCount": 1845}, {"range": "50%+", "sampleCount": 58, "geneCount": 678}]}'),
(2, 12.3, 98, 2890, 8920000, '{"ranges": [{"range": "0-10%", "sampleCount": 500, "geneCount": 35000}, {"range": "10-20%", "sampleCount": 200, "geneCount": 8500}, {"range": "20-30%", "sampleCount": 100, "geneCount": 2800}, {"range": "30-50%", "sampleCount": 60, "geneCount": 1200}, {"range": "50%+", "sampleCount": 32, "geneCount": 390}]}'),
(3, 25.6, 280, 6800, 54200000, '{"ranges": [{"range": "0-10%", "sampleCount": 800, "geneCount": 50000}, {"range": "10-20%", "sampleCount": 400, "geneCount": 18000}, {"range": "20-30%", "sampleCount": 200, "geneCount": 5500}, {"range": "30-50%", "sampleCount": 150, "geneCount": 2800}, {"range": "50%+", "sampleCount": 70, "geneCount": 1000}]}');

-- 검증 규칙 샘플 (전역 규칙)
INSERT INTO verification_rules (project_id, label, status, category, metric, `condition`, threshold)
VALUES
(NULL, '리드 정렬성', 'active', '정렬성', 'read_mapping', '>=', 90),
(NULL, '위양성 SNP calls', 'active', '정렬성', 'snp_calls', '<=', 5),
(NULL, '동일 준비 동일 LC-MS', 'active', '정밀성', 'consistency', '>=', 85),
(NULL, '기기 안정성', 'active', '완전성', 'batch_drift', '<=', 10);

-- 검증 상태 샘플
INSERT INTO verification_status (project_id, label, score, standard)
VALUES
(1, '정렬성', 92, 90),
(1, '정밀성', 88, 85),
(1, '완전성', 95, 90),
(1, '타당성', 87, 85),
(1, '일치성', 91, 88);

EXIT;
```

### 3. 데이터베이스 설정

`backend/app/core/config.py` 파일에서 MySQL 연결 정보를 확인/수정할 수 있습니다:

```python
mysql_host: str = '127.0.0.1'
mysql_port: int = 3306
mysql_user: str = 'root'
mysql_password: str = 'Mysql1234'
mysql_db: str = 'data_qc'
```

또는 `.env` 파일을 생성하여 설정할 수 있습니다:

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=Mysql1234
MYSQL_DB=data_qc
```

## 설치 및 실행

### 1. 가상환경 생성 및 활성화

```bash
# Windows (CMD/PowerShell 권장)
py -m venv venv
venv\Scripts\activate

# Windows (Git Bash에서 오류 발생 시)
# 방법 1: fix_venv.sh 스크립트 사용
bash fix_venv.sh

# 방법 2: CMD를 통해 직접 실행
cmd.exe /c "C:\Users\사용자명\AppData\Local\Programs\Python\Python314\python.exe" -m venv venv

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

**⚠️ 문제 해결:**

- `encodings module` 오류가 발생하면 Git Bash 대신 **CMD** 또는 **PowerShell**을 사용하세요
- 또는 `fix_venv.sh` 스크립트를 실행하세요: `bash fix_venv.sh`
- **numpy 컴파일 오류**가 발생하면:
  - Python 3.14는 매우 최신 버전이므로 일부 패키지가 아직 완전히 지원하지 않을 수 있습니다
  - **권장**: Python 3.12 또는 3.13 사용 (더 안정적이고 패키지 호환성이 좋음)
  - 또는 Visual Studio Build Tools를 설치하여 소스에서 빌드할 수 있습니다

### 2. 의존성 설치

```bash
pip install -r requirements.txt
```

### 3. 데이터베이스 초기화

**가상환경을 활성화한 후** 데이터베이스 테이블을 생성하고 샘플 데이터를 추가합니다:

```bash
# 가상환경 활성화
source venv/bin/activate  # Mac/Linux
# 또는
venv\Scripts\activate  # Windows

# 데이터베이스 초기화
python init_database.py
```

이 스크립트는 다음 작업을 수행합니다:

- 데이터베이스 테이블 생성 (projects, data_files, missing_values, verification_rules 등)
- 샘플 프로젝트 및 데이터 추가

### 4. 서버 실행

**가상환경이 활성화된 상태에서** 서버를 실행합니다:

```bash
# 가상환경 활성화 (아직 안 했다면)
source venv/bin/activate  # Mac/Linux
# 또는
venv\Scripts\activate  # Windows

# 개발 모드 (자동 리로드)
uvicorn main:app --reload --host 0.0.0.0 --port 8005

# 프로덕션 모드
uvicorn main:app --host 0.0.0.0 --port 8005
```

서버는 기본적으로 `http://localhost:8005`에서 실행됩니다.

## API 엔드포인트

### 프로젝트 관리

- `GET /api/projects` - 프로젝트 목록 조회
- `GET /api/projects/{project_id}` - 특정 프로젝트 조회
- `POST /api/projects` - 새 프로젝트 생성
- `PUT /api/projects/{project_id}` - 프로젝트 업데이트
- `DELETE /api/projects/{project_id}` - 프로젝트 삭제

### 데이터 관리

- `GET /api/data` - 데이터 파일 목록 조회
- `GET /api/data/{file_id}` - 특정 파일 조회
- `POST /api/data/upload` - 파일 업로드
- `DELETE /api/data/{file_id}` - 파일 삭제

### 결측치 분석

- `GET /api/missing-value/projects` - 결측치 보간 가능한 프로젝트 목록
- `GET /api/missing-value/summary/{project_id}` - 결측치 분석 데이터
- `GET /api/missing-value/summary/{project_id}/summary` - 결측치 요약
- `GET /api/missing-value/summary/{project_id}/distribution` - 결측치 분포

### 검증

- `GET /api/verification/dashboard` - 검증 대시보드 데이터
- `GET /api/verification/status` - 검증 상태
- `GET /api/verification/rules` - 검증 규칙 목록
- `POST /api/verification/rules` - 검증 규칙 생성
- `PUT /api/verification/rules/{rule_id}` - 검증 규칙 업데이트
- `DELETE /api/verification/rules/{rule_id}` - 검증 규칙 삭제

### 보간 (Imputation)

- `GET /api/imputation/methods` - 사용 가능한 보간 방법 목록
- `POST /api/imputation/execute` - 보간 작업 실행
- `GET /api/imputation/status/{job_id}` - 보간 작업 상태 조회
- `GET /api/imputation/results/{job_id}` - 보간 결과 조회

## 프로젝트 구조

```
backend/
├── main.py                 # FastAPI 앱 진입점
├── requirements.txt         # Python 의존성
├── app/
│   ├── api/
│   │   └── routes/          # API 라우터
│   │       ├── projects.py
│   │       ├── data.py
│   │       ├── missing_value.py
│   │       ├── verification.py
│   │       └── imputation.py
│   ├── models/
│   │   └── schemas.py       # Pydantic 스키마
│   ├── services/
│   │   └── imputation_service.py  # 보간 서비스 (ML 모델 통합 가능)
│   └── utils/               # 유틸리티 함수
```

## 데이터베이스 구조

### 주요 테이블

1. **projects**: 프로젝트 정보
   - 프로젝트 이름, 설명, 샘플 수, 품질 점수 등

2. **data_files**: 데이터 파일 정보
   - 프로젝트에 속한 데이터 파일 정보

3. **missing_values**: 결측치 분석 데이터
   - 프로젝트별 결측치 통계 및 분포

4. **verification_rules**: 검증 규칙
   - 데이터 품질 검증을 위한 규칙

5. **verification_status**: 검증 상태
   - 프로젝트별 검증 상태 (정렬성, 정밀성, 완전성 등)

6. **imputation_jobs**: 보간 작업
   - 결측치 보간 작업 이력 및 결과

## 환경 변수

`.env` 파일을 생성하여 환경 변수를 설정할 수 있습니다:
(`.env.example` 참고)

```env
# MySQL 데이터베이스 설정
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=Mysql1234
MYSQL_DB=data_qc
MYSQL_ECHO=False

# 로깅 레벨
LOG_LEVEL=INFO
```
