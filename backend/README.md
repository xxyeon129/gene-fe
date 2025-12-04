# GENE-Q Backend API

FastAPI 기반 백엔드 서버로, GENE-Q 프론트엔드와 통신하며 데이터 품질 관리 및 결측치 보간 기능을 제공합니다.

## 주요 기능

- 프로젝트 관리 API
- 데이터 파일 업로드/관리 API
- 결측치 분석 및 보간 API
- 검증 규칙 관리 API
- ML 모델 기반 결측치 보간 (확장 가능)

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
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# 프로덕션 모드
uvicorn main:app --host 0.0.0.0 --port 8000
```

서버는 기본적으로 `http://localhost:8000`에서 실행됩니다.

## API 문서

서버 실행 후 다음 URL에서 자동 생성된 API 문서를 확인할 수 있습니다:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

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

## ML 모델 통합

`app/services/imputation_service.py`에서 다양한 ML 기반 보간 방법을 구현할 수 있습니다:

- **MOCHI**: 멀티오믹스 데이터에 최적화된 AI 보간 모델 (추천)
- **Mean/Median**: 통계적 방법
- **KNN**: K-Nearest Neighbors
- **MICE**: Multiple Imputation by Chained Equations
- **MissForest**: Random Forest 기반
- **GAIN**: Generative Adversarial Imputation Network
- **VAE**: Variational Autoencoder

각 방법은 확장 가능한 구조로 설계되어 있으며, 실제 ML 모델을 통합할 수 있습니다.

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

```env
# MySQL 데이터베이스 설정
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=Mysql1234
MYSQL_DB=data_qc
MYSQL_ECHO=False

# ML 모델 서버 설정
ML_SERVER_JUMP_HOST=210.102.178.234
ML_SERVER_JUMP_PORT=22
ML_SERVER_JUMP_USER=humandeep
ML_SERVER_JUMP_PASSWORD=humandeep1234

ML_SERVER_FINAL_HOST=192.9.203.83
ML_SERVER_FINAL_USER=humandeep
ML_SERVER_FINAL_PASSWORD=humandeep1234

ML_MODEL_PATH=/home/humandeep/nmf
SSH_TIMEOUT=30

# 로깅 레벨
LOG_LEVEL=INFO
```

## 향후 확장 계획

- [x] MySQL 데이터베이스 연동
- [ ] 실제 ML 모델 통합
- [ ] 파일 저장소 연동 (S3, 로컬 스토리지)
- [ ] 인증/인가 시스템
- [ ] 작업 큐 시스템 (Celery, Redis)
- [ ] 실시간 작업 상태 업데이트 (WebSocket)
