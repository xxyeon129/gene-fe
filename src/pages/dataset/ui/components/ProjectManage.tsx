import { useState } from "react";
import * as S from "./projectManage.styles";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

const projects = [
  {
    id: 1,
    name: "암 유전체 프로젝트",
    description: "대규모 암 유전체 데이터 분석",
    tags: ["전사체", "대사체"],
    samples: 450,
    lastUpdate: "2시간 전",
    active: true,
  },
  {
    id: 2,
    name: "알츠하이머 연구",
    description: "신경퇴행성 질환 바이오마커 발굴",
    tags: ["전사체", "메틸화"],
    samples: 280,
    lastUpdate: "1일 전",
    active: false,
  },
  {
    id: 3,
    name: "심혈관 질환 코호트",
    description: "다중 오믹스 통합 분석",
    tags: ["전체 오믹스"],
    samples: 620,
    lastUpdate: "3일 전",
    active: false,
  },
];

export const ProjectManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(1);

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

      {isModalOpen && <ProjectModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};



