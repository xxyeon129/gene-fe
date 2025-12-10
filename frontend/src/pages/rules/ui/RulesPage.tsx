/**
 * @description 검증 규칙 설정 페이지
 */

import { useState, useEffect } from "react";
import * as S from "./rulesPage.styles";
import { BasicQualityIndicators } from "./components/BasicQualityIndicators";
import { AdvancedQualityIndicators } from "./components/AdvancedQualityIndicators";
import { apiClient } from "@/shared/api";

interface Project {
  id: number;
  name: string;
  description: string;
}

interface ValidationRules {
  dna_threshold: number;
  rna_threshold: number;
  protein_threshold: number;
  methyl_threshold: number;
  batch_effect_threshold: number;
  sample_matching_enabled: boolean;
  range_validation_enabled: boolean;
}

export const RulesPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [saving, setSaving] = useState(false);
  const [rules, setRules] = useState<ValidationRules>({
    dna_threshold: 1.0,
    rna_threshold: 20.0,
    protein_threshold: 25.0,
    methyl_threshold: 25.0,
    batch_effect_threshold: 5.0,
    sample_matching_enabled: true,
    range_validation_enabled: true,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const data = await apiClient.getProjects() as Project[];
        setProjects(data);
        if (data.length > 0) {
          setSelectedProjectId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // 프로젝트 선택 시 해당 프로젝트의 규칙 불러오기
  useEffect(() => {
    const loadRules = async () => {
      if (!selectedProjectId) return;

      try {
        const loadedRules = await apiClient.getValidationRules(selectedProjectId) as ValidationRules;
        setRules(loadedRules);
      } catch (err) {
        console.error("Failed to load validation rules:", err);
      }
    };

    loadRules();
  }, [selectedProjectId]);

  const handleSaveRules = async () => {
    if (!selectedProjectId) {
      alert("프로젝트를 선택해주세요.");
      return;
    }

    try {
      setSaving(true);
      await apiClient.saveValidationRules(selectedProjectId, rules);
      alert("검증 규칙이 저장되었습니다.");
    } catch (err) {
      console.error("Failed to save validation rules:", err);
      alert("검증 규칙 저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <S.Section>
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>품질 검증 규칙 설정</S.CardTitle>
          <S.Button>+ 커스텀 규칙 추가</S.Button>
        </S.CardHeader>

        <S.Alert $type="info">
          <span>💡</span>
          <div>
            <div>기초/심화 품질지표 체계</div>
            <div>바이오뱅크 임상·유전체 데이터 항목 기반 품질지표 지표를 적용하여 데이터 품질을 검증합니다.</div>
          </div>
        </S.Alert>

        <S.FormGroup>
          <S.FormLabel>프로젝트 선택</S.FormLabel>
          <S.FormSelect
            value={selectedProjectId || ""}
            onChange={(e) => setSelectedProjectId(Number(e.target.value))}
            disabled={loadingProjects}
          >
            <option value="">프로젝트를 선택하세요</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </S.FormSelect>
          {loadingProjects && <div style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>프로젝트 목록 로딩 중...</div>}
        </S.FormGroup>

        <S.SectionTitle>📊 기초품질지표 - 단일 모달리티 공통검증지표</S.SectionTitle>
        <BasicQualityIndicators
          rules={rules}
          onRulesChange={setRules}
        />

        <S.SectionTitle>🎯 심화품질지표 - 멀티 모달리티 검증지표</S.SectionTitle>
        <AdvancedQualityIndicators
          rules={rules}
          onRulesChange={setRules}
        />

        <S.SaveButtonContainer>
          <S.Button
            $fullWidth
            onClick={handleSaveRules}
            disabled={!selectedProjectId || saving}
          >
            💾 {saving ? "저장 중..." : "검증 규칙 저장 및 적용"}
          </S.Button>
        </S.SaveButtonContainer>
      </S.Card>
    </S.Section>
  );
};



