# Data QC (Quality Control) System

멀티-오믹스 데이터의 품질 관리 및 검증을 위한 통합 시스템입니다.

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [주요 기능](#주요-기능)
- [시스템 아키텍처](#시스템-아키텍처)
- [설치 및 실행](#설치-및-실행)
- [사용 방법](#사용-방법)
- [동작 로직](#동작-로직)
- [기술 스택](#기술-스택)

## 프로젝트 개요

Data QC System은 다양한 오믹스 데이터(DNA, RNA, Methyl, Protein)의 품질을 검증하고 관리하는 웹 기반 플랫폼입니다. 데이터의 결측치를 분석하고, 완전성을 평가하며, 필요 시 데이터 보간을 수행할 수 있습니다.
현재 프로젝트는 AI기반 결측 보간 모델(MOCHI)에 맞추어 RNA, Methyl, Protein tsv 데이터를 기반으로 결측치 측정 및 데이터 보간이 동작하도록 설계되었습니다.
## 주요 기능

### 1. 대시보드
- 전체 프로젝트 통계 확인 (활성 프로젝트, 평균 데이터 품질, 처리된 데이터셋, 평균 결측률)
- 프로젝트별 데이터셋 완전성 시각화
- DNA, RNA, Methyl, Protein 데이터의 완전성을 색상별 진행바로 표시

### 2. 데이터셋 관리
- **프로젝트 생성 및 관리**
  - 프로젝트 정보 입력 (이름, 설명, 데이터 타입)
  - 프로젝트 목록 조회 및 삭제
  - CSV/TSV 파일을 통한 일괄 프로젝트 생성

- **데이터 입력**
  - 파일 업로드 (CSV, Excel, TSV, JSON 형식 지원, 최대 500MB)
  - 드래그 앤 드롭 업로드 지원
  - 업로드된 파일 목록 확인

### 3. 데이터 검증
- **완전성 검증**
  - 프로젝트별 데이터 파일의 결측치(NaN) 비율 확인
  - 데이터셋 타입별 완전성 점수 계산 (100 - 결측치 비율)
  - 파일별 검증 결과 및 통과 여부 확인

- **검증 규칙 설정**
  - 데이터 타입별 결측치 임계값 설정
    - DNA: 기본 1.0%
    - RNA: 기본 20.0%
    - Protein: 기본 25.0%
    - Methyl: 기본 25.0%

  > **참고**: 현재 결측치 여부를 확인하고 보간하는 시스템으로 설계되었기에 해당 탭의 지표들은 사용되지 않습니다. 연구원과의 논의를 통해 존속 및 적용 여부를 확인해야 합니다.

- **검증 결과 조회**
  - 품질 메트릭 카드로 RNA, Protein, Methyl 완전성 확인
  - 파일별 상세 검증 결과 테이블
  - 검증 보고서 다운로드 (TXT 형식)

### 4. 데이터 보간
- **보간 방법 선택**
  - MOCHI: 멀티-오믹스 데이터 특화 보간 알고리즘
  - MEAN: 중앙값 보간
  - KNN: K-최근접 이웃 기반 보간
  - MICE: 다중 대치법(실제 데이터 적용시 연산 과부하로 주석처리됨)
  > **참고**: 사용된 tsv 데이터에는 MOCHI 이외의 보간 방법은 적용되지 않습니다.(코드상 구현은 되어 있으나 현재 사용하는 tsv 파일에는 데이터 구조상 적용X)

- **보간 실행 및 모니터링**
  - MOCHI AI모델을 사용한 보간 실행
  - 보간 완료 후 결과 파일 다운로드

## 시스템 아키텍처

```
data-qc/
├── frontend/          # React + TypeScript 프론트엔드
│   ├── src/
│   │   ├── pages/     # 페이지 컴포넌트
│   │   │   ├── dashboard/    # 대시보드
│   │   │   ├── dataset/      # 데이터셋 관리
│   │   │   ├── validation/   # 검증
│   │   │   └── imputation/   # 보간
│   │   ├── entities/  # 도메인 모델
│   │   ├── shared/    # 공유 유틸리티
│   │   └── widgets/   # 공통 위젯
│   └── package.json
│
├── backend/           # FastAPI 백엔드
│   ├── app/
│   │   ├── api/       # API 라우트
│   │   │   └── routes/
│   │   │       ├── projects.py    # 프로젝트 관리
│   │   │       ├── data.py        # 데이터 파일 관리
│   │   │       ├── validation.py  # 검증
│   │   │       ├── imputation.py  # 보간
│   │   │       └── dashboard.py   # 대시보드 통계
│   │   ├── core/      # 핵심 설정
│   │   ├── db/        # 데이터베이스
│   │   └── models/    # 데이터 모델
│   ├── main.py
│   └── requirements.txt
│
└── uploads/           # 업로드된 파일 저장소
    └── project_*/
        ├── raw/       # 원본 파일
        └── imputed/   # 보간 결과 파일
```

## 설치 및 실행

### 사전 요구사항

- Node.js (v16 이상)
- Python (3.9 이상)
- MySQL (8.0 이상)

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd data-qc
```

### 2. 데이터베이스 설정

```bash
# MySQL 데이터베이스 생성
mysql -u root -p
CREATE DATABASE data_qc;
EXIT;
```

### 3. 백엔드 설정

```bash
cd backend

# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 또는
venv\Scripts\activate     # Windows

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 데이터베이스 정보 입력

# 데이터베이스 초기화
python init_database.py

# 백엔드 서버 실행
python main.py
# 또는
./start.sh  # Linux/Mac
start.bat   # Windows
```

백엔드 서버는 `http://localhost:8005`에서 실행됩니다.

### 4. 프론트엔드 설정

```bash
cd frontend

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm start
# 또는
yarn start
```

프론트엔드는 `http://localhost:3000`에서 실행됩니다.

## 사용 방법

### 1. 프로젝트 생성

1. 상단 메뉴에서 "데이터셋" 탭 선택
2. 좌측 패널에서 "새 프로젝트" 버튼 클릭
3. 프로젝트 정보 입력:
   - 프로젝트 이름
   - 설명
   - 데이터 타입 선택 (전사체, 대사체, 단백체, 메틸화)
4. "생성" 버튼 클릭

### 2. 데이터 파일 업로드

1. 생성된 프로젝트 선택
2. "데이터 입력 방법" 섹션에서 프로젝트 선택
3. 파일 업로드 영역에 파일 드래그 또는 클릭하여 선택
4. 지원 형식: CSV, TSV, Excel, JSON (실질적으로 TSV Only 지원)
5. 업로드 완료 후 파일 목록에서 확인

### 3. 데이터 검증 실행

1. "검증" 탭으로 이동
2. 검증할 프로젝트 선택
3. (선택사항 - 실제 적용X) "검증 규칙" 탭에서 임계값 조정
4. "검증 실행" 버튼 클릭
5. 검증 완료 후 결과 확인:
   - 품질 메트릭: RNA, Protein, Methyl 완전성
   - 검증 결과 테이블: 파일별 상세 정보
   - 보고서 다운로드 가능

### 4. 데이터 보간

1. 검증 완료 후 "보간" 탭으로 이동
2. 보간할 프로젝트 선택
3. 보간 방법 선택 (MOCHI)
4. 임계값 설정 (결측률이 임계값 이상인 샘플만 보간)
5. "보간 실행" 버튼 클릭
6. 진행 상황 모니터링
7. 완료 후 결과 파일 다운로드

### 5. 대시보드 확인

1. "대시보드" 탭에서 전체 통계 확인
2. 프로젝트별 데이터셋 완전성 그래프 확인
3. DNA, RNA, Methyl, Protein 각 데이터 타입별 완전성 비교

## 동작 로직

### 데이터 검증 프로세스

1. **파일 로드**
   - 프로젝트의 `uploads/project_<id>/raw/` 디렉토리에서 TSV 파일 탐색
   - Pandas를 사용하여 TSV 파일 파싱

2. **결측치 분석**
   ```python
   # 전체 결측치 계산
   total_values = df.size
   nan_count = df.isna().sum().sum()
   nan_percentage = (nan_count / total_values * 100)

   # 완전성 점수 계산
   completeness = 100.0 - nan_percentage
   ```

3. **데이터 타입 판별**
   - 파일명 기반으로 데이터 타입 자동 감지
   - DNA/SNP: 임계값 1.0%
   - RNA: 임계값 20.0%
   - Protein: 임계값 25.0%
   - Methyl: 임계값 25.0%

4. **검증 결과 저장**
   - 파일별 검증 결과를 데이터베이스에 저장
   - 프로젝트의 품질 점수 업데이트 (사용 가능한 데이터셋의 평균 완전성)
   - 검증 상태 업데이트 (검증완료/처리중)

### 데이터 완전성 계산

```
완전성 점수 = 100 - (결측치 개수 / 전체 값 개수 × 100)

예시:
- 전체 값: 10,000개
- 결측치: 500개
- 완전성: 100 - (500 / 10,000 × 100) = 95.0%
```

### 백그라운드 작업

검증 및 보간 작업은 FastAPI의 `BackgroundTasks`를 활용하여 비동기로 실행됩니다:

```python
@router.post("/execute")
async def execute_validation(
    project_id: int,
    background_tasks: BackgroundTasks
):
    job_id = str(uuid.uuid4())

    background_tasks.add_task(
        _run_validation,
        job_id=job_id,
        project_id=project_id
    )

    return {"jobId": job_id, "status": "processing"}
```

클라이언트는 `job_id`를 사용하여 주기적으로 작업 상태를 폴링합니다.

## 기술 스택

### 프론트엔드
- **React 19** - UI 프레임워크
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Styled Components** - CSS-in-JS 스타일링
- **Feature-Sliced Design** - 아키텍처 패턴

### 백엔드
- **FastAPI** - 웹 프레임워크
- **SQLAlchemy** - ORM
- **Pydantic** - 데이터 검증
- **Pandas** - 데이터 처리
- **NumPy** - 수치 계산
- **PyMySQL** - MySQL 드라이버

### 데이터베이스
- **MySQL 8.0** - 관계형 데이터베이스

### 주요 API 엔드포인트

```
GET    /api/projects              # 프로젝트 목록 조회
POST   /api/projects              # 프로젝트 생성
GET    /api/projects/{id}         # 프로젝트 상세 조회
DELETE /api/projects/{id}         # 프로젝트 삭제

GET    /api/data                  # 데이터 파일 목록
POST   /api/data/upload           # 파일 업로드

POST   /api/validation/execute    # 검증 실행
GET    /api/validation/status/{job_id}  # 검증 상태 조회
POST   /api/validation/rules/{project_id}  # 검증 규칙 저장
GET    /api/validation/rules/{project_id}  # 검증 규칙 조회
GET    /api/validation/download-report/{project_id}  # 검증 보고서 다운로드

POST   /api/imputation/execute    # 보간 실행
GET    /api/imputation/status/{job_id}  # 보간 상태 조회
GET    /api/imputation/download/{job_id}  # 보간 결과 다운로드

GET    /api/dashboard/stats       # 대시보드 통계
```

## 데이터베이스 스키마

### projects 테이블
```sql
- id (INT, PK)
- name (VARCHAR)
- description (TEXT)
- data_type (JSON)
- quality_score (FLOAT)
- dna_quality_score (FLOAT)
- rna_quality_score (FLOAT)
- methyl_quality_score (FLOAT)
- protein_quality_score (FLOAT)
- validation_status (VARCHAR)
- sample_count (INT)
- status (VARCHAR)
- last_update (VARCHAR)
- sample_accuracy (FLOAT)
- created_at (DATETIME)
- updated_at (DATETIME)
```

### data_files 테이블
```sql
- id (INT, PK)
- project_id (INT, FK)
- name (VARCHAR)
- size (VARCHAR)
- file_path (VARCHAR)
- created_at (DATETIME)
```

## 향후 개발 계획

- [ ] 검증 규칙 탭의 세부 설정 기능 구현
- [ ] 샘플 매칭 정확도 검증
- [ ] 범위 유효성 검증
- [ ] 다중 프로젝트 비교 분석
- [ ] API 연동 기능 활성화

## 라이센스

이 프로젝트는 내부 사용을 위한 것입니다.
