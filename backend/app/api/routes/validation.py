"""
Data validation API routes
간단한 검증 기능 (NaN 값 확인)
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import Optional, Dict, Any
from pydantic import BaseModel
import uuid
from datetime import datetime
from pathlib import Path
import pandas as pd
import numpy as np

router = APIRouter()

# 검증 작업 저장소
validation_jobs = {}

# 프로젝트별 검증 규칙 저장소
validation_rules = {}


class ValidationRule(BaseModel):
    """검증 규칙 모델"""
    dna_threshold: float = 1.0
    rna_threshold: float = 20.0
    protein_threshold: float = 25.0
    methyl_threshold: float = 25.0
    batch_effect_threshold: float = 5.0
    sample_matching_enabled: bool = True
    range_validation_enabled: bool = True


@router.post("/execute")
async def execute_validation(
    project_id: int,
    background_tasks: BackgroundTasks
):
    """
    프로젝트 데이터에 대한 검증 실행 (NaN 값 확인)

    저장된 검증 규칙을 사용하여 검증을 수행합니다.
    """
    job_id = str(uuid.uuid4())

    # 저장된 검증 규칙 가져오기
    rules = validation_rules.get(project_id, ValidationRule().dict())

    # 백그라운드 작업으로 검증 실행
    background_tasks.add_task(
        _run_validation,
        job_id=job_id,
        project_id=project_id,
        rules=rules
    )

    validation_jobs[job_id] = {
        "status": "processing",
        "created_at": datetime.now().isoformat(),
        "project_id": project_id,
        "rules": rules,
    }

    return {
        "jobId": job_id,
        "status": "processing",
        "message": "Validation job started with custom rules",
        "estimatedTime": 30,
        "rules": rules
    }


@router.get("/status/{job_id}")
async def get_validation_status(job_id: str):
    """검증 작업 상태 조회"""
    job = validation_jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job


@router.post("/rules/{project_id}")
async def save_validation_rules(project_id: int, rules: ValidationRule):
    """
    프로젝트의 검증 규칙 저장

    Parameters:
    - project_id: 프로젝트 ID
    - rules: 검증 규칙 (임계값 등)
    """
    validation_rules[project_id] = rules.dict()

    return {
        "message": "Validation rules saved successfully",
        "project_id": project_id,
        "rules": validation_rules[project_id]
    }


@router.get("/rules/{project_id}")
async def get_validation_rules(project_id: int):
    """
    프로젝트의 검증 규칙 조회

    Parameters:
    - project_id: 프로젝트 ID

    Returns:
    - 저장된 검증 규칙 또는 기본값
    """
    # 저장된 규칙이 있으면 반환, 없으면 기본값 반환
    if project_id in validation_rules:
        return validation_rules[project_id]
    else:
        # 기본 규칙 반환
        default_rules = ValidationRule()
        return default_rules.dict()


@router.get("/download-report/{project_id}")
async def download_validation_report(project_id: int):
    """
    검증 결과 보고서 다운로드

    프로젝트의 검증 결과를 TSV 형식의 보고서로 다운로드합니다.
    """
    from fastapi.responses import FileResponse
    import tempfile

    try:
        # 해당 프로젝트의 가장 최근 완료된 검증 작업 찾기
        completed_jobs = [
            job for job in validation_jobs.values()
            if job.get("project_id") == project_id and job.get("status") == "completed"
        ]

        if not completed_jobs:
            raise HTTPException(
                status_code=404,
                detail=f"No completed validation results found for project {project_id}"
            )

        # 가장 최근 작업 선택
        latest_job = max(completed_jobs, key=lambda x: x.get("completed_at", ""))
        results = latest_job.get("results", {})

        # 보고서 생성
        report_lines = []
        report_lines.append("=" * 80)
        report_lines.append("데이터 품질 검증 결과 보고서")
        report_lines.append("=" * 80)
        report_lines.append(f"프로젝트 ID: {project_id}")
        report_lines.append(f"검증 완료 시간: {latest_job.get('completed_at', 'N/A')}")
        report_lines.append("")
        report_lines.append(f"전체 파일 수: {results.get('total_files', 0)}")
        report_lines.append(f"통과한 파일 수: {results.get('passed_files', 0)}")
        report_lines.append(f"전체 검증 결과: {'✅ 통과' if results.get('all_passed', False) else '❌ 실패'}")
        report_lines.append("")
        report_lines.append("-" * 80)
        report_lines.append("파일별 상세 결과")
        report_lines.append("-" * 80)
        report_lines.append("")

        for file_result in results.get("files", []):
            report_lines.append(f"파일명: {file_result.get('filename', 'N/A')}")

            if "error" in file_result:
                report_lines.append(f"  상태: ❌ 오류 발생")
                report_lines.append(f"  오류: {file_result.get('error', 'N/A')}")
            else:
                report_lines.append(f"  상태: {'✅ 통과' if file_result.get('passed', False) else '❌ 실패'}")
                report_lines.append(f"  데이터 형태: {file_result.get('shape', [0, 0])}")
                report_lines.append(f"  전체 값 개수: {file_result.get('total_values', 0):,}")
                report_lines.append(f"  결측치 개수: {file_result.get('nan_count', 0):,}")
                report_lines.append(f"  결측치 비율: {file_result.get('nan_percentage', 0):.2f}%")
                report_lines.append(f"  최대 행 결측치 비율: {file_result.get('max_row_nan_percentage', 0):.2f}%")
                report_lines.append(f"  최대 열 결측치 비율: {file_result.get('max_col_nan_percentage', 0):.2f}%")

            report_lines.append("")

        report_lines.append("=" * 80)
        report_lines.append("보고서 끝")
        report_lines.append("=" * 80)

        # 임시 파일에 보고서 작성
        with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False, encoding='utf-8') as temp_file:
            temp_file.write("\n".join(report_lines))
            temp_path = temp_file.name

        # 파일 다운로드 응답
        return FileResponse(
            path=temp_path,
            filename=f"validation_report_project_{project_id}.txt",
            media_type="text/plain",
            headers={
                "Content-Disposition": f"attachment; filename=validation_report_project_{project_id}.txt"
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate validation report: {str(e)}"
        )


def _run_validation(job_id: str, project_id: int, rules: Dict[str, Any]):
    """검증 백그라운드 작업"""
    try:
        print(f"[Job {job_id}] Starting validation for project {project_id}")
        print(f"[Job {job_id}] Using validation rules: {rules}")

        # 데이터 로드
        data_dir = Path("/home/humandeep/data-qc/uploads")
        project_dir = data_dir / f"project_{project_id}" / "raw"

        if not project_dir.exists():
            raise FileNotFoundError(f"Project directory not found: {project_dir}")

        # 파일 찾기
        files = list(project_dir.glob("*.tsv"))
        if not files:
            raise FileNotFoundError(f"No TSV files found in {project_dir}")

        results = []

        # 데이터셋별 완전성 저장
        completeness_scores = {
            "dna": None,
            "rna": None,
            "methyl": None,
            "protein": None
        }

        for file_path in files:
            print(f"[Job {job_id}] Validating {file_path.name}")

            # 파일 로드
            try:
                df = pd.read_csv(file_path, sep="\t", index_col=0)

                # NaN 값 확인
                total_values = df.size
                nan_count = df.isna().sum().sum()
                nan_percentage = (nan_count / total_values * 100) if total_values > 0 else 0

                # 행별, 열별 NaN 비율
                row_nan_percentages = (df.isna().sum(axis=1) / len(df.columns) * 100)
                col_nan_percentages = (df.isna().sum(axis=0) / len(df) * 100)

                # 최대 NaN 비율을 가진 행/열
                max_row_nan = row_nan_percentages.max() if len(row_nan_percentages) > 0 else 0
                max_col_nan = col_nan_percentages.max() if len(col_nan_percentages) > 0 else 0

                # 파일 타입별로 적절한 임계값 선택
                filename_lower = file_path.name.lower()
                if "dna" in filename_lower or "snp" in filename_lower:
                    threshold = rules.get("dna_threshold", 1.0)
                    data_type = "DNA"
                elif "rna" in filename_lower:
                    threshold = rules.get("rna_threshold", 20.0)
                    data_type = "RNA"
                elif "protein" in filename_lower or "prot" in filename_lower:
                    threshold = rules.get("protein_threshold", 25.0)
                    data_type = "Protein"
                elif "methy" in filename_lower or "methyl" in filename_lower:
                    threshold = rules.get("methyl_threshold", 25.0)
                    data_type = "Methyl"
                else:
                    # 기본 임계값
                    threshold = 50.0
                    data_type = "Unknown"

                # 결측치 비율이 임계값 이하인지 확인
                passed = bool(nan_percentage <= threshold)

                # 완전성 점수 계산 (100 - 결측치 비율)
                completeness = 100.0 - nan_percentage

                file_result = {
                    "filename": file_path.name,
                    "data_type": data_type,
                    "total_values": int(total_values),
                    "nan_count": int(nan_count),
                    "nan_percentage": round(float(nan_percentage), 2),
                    "completeness": round(float(completeness), 2),
                    "shape": list(df.shape),
                    "max_row_nan_percentage": round(float(max_row_nan), 2),
                    "max_col_nan_percentage": round(float(max_col_nan), 2),
                    "threshold_used": threshold,
                    "passed": passed,
                }

                # 데이터셋별 완전성 점수 저장
                if data_type == "DNA":
                    completeness_scores["dna"] = completeness
                elif data_type == "RNA":
                    completeness_scores["rna"] = completeness
                elif data_type == "Methyl":
                    completeness_scores["methyl"] = completeness
                elif data_type == "Protein":
                    completeness_scores["protein"] = completeness

                results.append(file_result)
                print(f"[Job {job_id}] {file_path.name} ({data_type}): {nan_percentage:.2f}% NaN, {completeness:.2f}% Complete (threshold: {threshold}%) - {'PASSED' if passed else 'FAILED'}")

            except Exception as e:
                print(f"[Job {job_id}] Failed to validate {file_path.name}: {e}")
                results.append({
                    "filename": file_path.name,
                    "error": str(e),
                    "passed": False
                })

        # 전체 검증 결과
        all_passed = all(r.get("passed", False) for r in results)

        # 프로젝트 DB 업데이트
        try:
            from app.db.session import SessionLocal
            from app.models.base import Project

            db = SessionLocal()
            project = db.query(Project).filter(Project.id == project_id).first()

            if project:
                # 데이터셋별 완전성 점수 업데이트
                if completeness_scores["dna"] is not None:
                    project.dna_quality_score = completeness_scores["dna"]
                    print(f"[Job {job_id}] Updated DNA completeness: {completeness_scores['dna']:.2f}%")

                if completeness_scores["rna"] is not None:
                    project.rna_quality_score = completeness_scores["rna"]
                    print(f"[Job {job_id}] Updated RNA completeness: {completeness_scores['rna']:.2f}%")

                if completeness_scores["methyl"] is not None:
                    project.methyl_quality_score = completeness_scores["methyl"]
                    print(f"[Job {job_id}] Updated Methyl completeness: {completeness_scores['methyl']:.2f}%")

                if completeness_scores["protein"] is not None:
                    project.protein_quality_score = completeness_scores["protein"]
                    print(f"[Job {job_id}] Updated Protein completeness: {completeness_scores['protein']:.2f}%")

                # 전체 품질 점수 계산 (사용 가능한 데이터셋들의 평균)
                available_scores = [s for s in completeness_scores.values() if s is not None]
                if available_scores:
                    project.quality_score = sum(available_scores) / len(available_scores)
                    print(f"[Job {job_id}] Updated overall quality score: {project.quality_score:.2f}%")

                # 검증 상태 업데이트
                if all_passed:
                    project.validation_status = "검증완료"
                else:
                    project.validation_status = "처리중"

                db.commit()
                print(f"[Job {job_id}] Project {project_id} updated successfully")
            else:
                print(f"[Job {job_id}] Warning: Project {project_id} not found in database")

            db.close()

        except Exception as e:
            print(f"[Job {job_id}] Failed to update project: {e}")
            import traceback
            traceback.print_exc()

        # 작업 상태 업데이트
        validation_jobs[job_id] = {
            "status": "completed",
            "created_at": validation_jobs[job_id]["created_at"],
            "completed_at": datetime.now().isoformat(),
            "project_id": project_id,
            "results": {
                "files": results,
                "total_files": len(results),
                "passed_files": sum(1 for r in results if r.get("passed", False)),
                "all_passed": all_passed,
                "completeness_scores": completeness_scores,
            }
        }

        print(f"[Job {job_id}] Validation completed successfully")

    except Exception as e:
        print(f"[Job {job_id}] Validation failed: {str(e)}")
        import traceback
        traceback.print_exc()

        validation_jobs[job_id] = {
            "status": "failed",
            "created_at": validation_jobs[job_id]["created_at"],
            "failed_at": datetime.now().isoformat(),
            "project_id": project_id,
            "error": str(e)
        }
