import { useState, useEffect } from "react";
import * as S from "./selectProject.styles";
import { apiClient } from "@/shared/api";
import { useMissingValue } from "../../contexts/MissingValueContext";

interface MissingValueProject {
  id: number;
  name: string;
  sampleCount: number;
  currentMissingValueRate: number;
}

export const SelectProject = () => {
  const [projects, setProjects] = useState<MissingValueProject[]>([]);
  const { selectedProjectId, setSelectedProjectId } = useMissingValue();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // 실제 프로젝트 목록 가져오기
        const projectsData = await apiClient.getProjects();

        // 프로젝트 데이터를 MissingValueProject 형식으로 변환
        const formattedProjects = projectsData.map((project: any) => ({
          id: project.id,
          name: project.name,
          sampleCount: project.sampleCount || 0,
          currentMissingValueRate: 0 // TODO: 실제 결측률 계산 필요
        }));

        setProjects(formattedProjects);
        if (formattedProjects && formattedProjects.length > 0) {
          setSelectedProjectId(formattedProjects[0].id);
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