import { useState, useEffect } from "react";
import * as S from "./selectProject.styles";
import { apiClient } from "@/shared/api";

interface MissingValueProject {
  id: number;
  name: string;
  sampleCount: number;
  currentMissingValueRate: number;
}

export const SelectProject = () => {
  const [projects, setProjects] = useState<MissingValueProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getMissingValueProjects();
        setProjects(data);
        if (data && data.length > 0) {
          setSelectedProjectId(data[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "프로젝트를 불러오는데 실패했습니다.");
        console.error("Failed to fetch missing value projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <S.WhiteBoxSection>
        <S.Title>📂 프로젝트 선택</S.Title>
        <div>로딩 중...</div>
      </S.WhiteBoxSection>
    );
  }

  if (error) {
    return (
      <S.WhiteBoxSection>
        <S.Title>📂 프로젝트 선택</S.Title>
        <div>에러: {error}</div>
      </S.WhiteBoxSection>
    );
  }

  return (
    <S.WhiteBoxSection>
      <S.Title>📂 프로젝트 선택</S.Title>
      <S.ProjectList>
        {projects.map((project) => (
          <S.ProjectItem
            key={project.id}
            $isActive={selectedProjectId === project.id}
            onClick={() => setSelectedProjectId(project.id)}
          >
            <S.ProjectItemTitle>{project.name}</S.ProjectItemTitle>
            <S.ProjectItemSampleCount>{project.sampleCount.toLocaleString()} samples</S.ProjectItemSampleCount>
            <S.ProjectItemCurrentMissingValueRate $isActive={selectedProjectId === project.id}>
              현재 결측률: {project.currentMissingValueRate}%
            </S.ProjectItemCurrentMissingValueRate>
          </S.ProjectItem>
        ))}
      </S.ProjectList>
    </S.WhiteBoxSection>
  );
};