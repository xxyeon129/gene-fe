import * as S from "./projectCard.styles";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    tags: string[];
    samples: number;
    lastUpdate: string;
    active: boolean;
  };
  selected: boolean;
  onClick: () => void;
}

const tagColors: Record<string, { bg: string; color: string }> = {
  전사체: { bg: "#eff6ff", color: "#2563eb" },
  대사체: { bg: "#f0fdf4", color: "#16a34a" },
  메틸화: { bg: "#fce7f3", color: "#be185d" },
  "전체 오믹스": { bg: "#f3e8ff", color: "#7c3aed" },
};

export const ProjectCard = ({ project, selected, onClick }: ProjectCardProps) => {
  return (
    <S.ProjectCard $selected={selected} onClick={onClick}>
      {project.active && <S.ProjectBadge>활성</S.ProjectBadge>}
      <S.ProjectName>{project.name}</S.ProjectName>
      <S.ProjectDescription>{project.description}</S.ProjectDescription>

      <S.TagsContainer>
        {project.tags.map((tag) => {
          const colors = tagColors[tag] || { bg: "#f1f5f9", color: "#475569" };
          return (
            <S.Tag key={tag} $bg={colors.bg} $color={colors.color}>
              {tag}
            </S.Tag>
          );
        })}
      </S.TagsContainer>

      <S.ProjectInfo>
        <span>샘플: {project.samples}</span>
        <span>업데이트: {project.lastUpdate}</span>
      </S.ProjectInfo>
    </S.ProjectCard>
  );
};
