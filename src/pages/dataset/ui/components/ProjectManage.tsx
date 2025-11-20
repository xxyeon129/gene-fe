import { useState, useEffect } from "react";
import * as S from "./projectManage.styles";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { apiClient } from "@/shared/api";

interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  samples: number;
  lastUpdate: string;
  active: boolean;
}

export const ProjectManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getProjects();
        setProjects(data);
        if (data && data.length > 0) {
          setSelectedProject(data[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "프로젝트를 불러오는데 실패했습니다.");
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectCreated = async () => {
    try {
      const data = await apiClient.getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to refresh projects:", err);
    }
  };

  if (loading) {
    return (
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>프로젝트 관리</S.CardTitle>
        </S.CardHeader>
        <div>로딩 중...</div>
      </S.Card>
    );
  }

  if (error) {
    return (
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>프로젝트 관리</S.CardTitle>
        </S.CardHeader>
        <div>에러: {error}</div>
      </S.Card>
    );
  }

  return (
    <>
      <S.Card>
        <S.CardHeader>
          <S.CardTitle>프로젝트 관리</S.CardTitle>
          <S.Button onClick={() => setIsModalOpen(true)}>+ 새 프로젝트</S.Button>
        </S.CardHeader>

        <S.ProjectGrid>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              selected={selectedProject === project.id}
              onClick={() => setSelectedProject(project.id)}
            />
          ))}
        </S.ProjectGrid>
      </S.Card>

      {isModalOpen && (
        <ProjectModal
          onClose={() => setIsModalOpen(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}
    </>
  );
};



