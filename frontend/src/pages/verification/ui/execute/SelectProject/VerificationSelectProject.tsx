import { useState, useEffect } from "react";
import { apiClient } from "@/shared/api";
import { useVerification } from "../../../contexts/VerificationContext";
import { CommonWhiteBoxSectionTitle } from "@/shared";
import { FiFolder } from "react-icons/fi";
import * as S from "./selectProject.styles";

interface Project {
  id: number;
  name: string;
}

export const VerificationSelectProject = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { selectedProjectId, setSelectedProjectId } = useVerification();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getProjects() as Project[];
        setProjects(data);
        if (data.length > 0) {
          setSelectedProjectId(data[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "프로젝트를 불러오는데 실패했습니다.");
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [setSelectedProjectId]);

  if (loading) {
    return (
      <S.WhiteBoxSection>
        <CommonWhiteBoxSectionTitle>
          <FiFolder /> 프로젝트 선택
        </CommonWhiteBoxSectionTitle>
        <div style={{ padding: "1rem", color: "#666" }}>로딩 중...</div>
      </S.WhiteBoxSection>
    );
  }

  if (error) {
    return (
      <S.WhiteBoxSection>
        <CommonWhiteBoxSectionTitle>
          <FiFolder /> 프로젝트 선택
        </CommonWhiteBoxSectionTitle>
        <div style={{ padding: "1rem", color: "#c00" }}>에러: {error}</div>
      </S.WhiteBoxSection>
    );
  }

  return (
    <S.WhiteBoxSection>
      <CommonWhiteBoxSectionTitle>
        <FiFolder /> 프로젝트 선택
      </CommonWhiteBoxSectionTitle>

      <S.FormGroup>
        <S.FormLabel>검증할 프로젝트를 선택하세요</S.FormLabel>
        <S.FormSelect
          value={selectedProjectId || ""}
          onChange={(e) => setSelectedProjectId(Number(e.target.value))}
        >
          <option value="">프로젝트를 선택하세요</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </S.FormSelect>
      </S.FormGroup>
    </S.WhiteBoxSection>
  );
};
