import * as S from "./projectCard.styles";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    dataType: string[];
    lastUpdate: string;
    qualityScore: number;
    validationStatus: string;
    sampleCount: number;
    status: string;
    sample_accuracy: number;

    DNA_qualityScore: number;
    RNA_qualityScore: number;
    Protein_qualityScore: number;
  };
  selected: boolean;
  onClick: () => void;
  onDelete?: (projectId: number) => void;
}

const tagColors: Record<string, { bg: string; color: string }> = {
  전사체: { bg: "#eff6ff", color: "#2563eb" },
  대사체: { bg: "#f0fdf4", color: "#16a34a" },
  메틸화: { bg: "#fce7f3", color: "#be185d" },
  "전체 오믹스": { bg: "#f3e8ff", color: "#7c3aed" },
};

export const ProjectCard = ({ project, selected, onClick, onDelete }: ProjectCardProps) => {
  const { id, name, description, dataType, lastUpdate, sampleCount, status } = project;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지

    if (window.confirm(`"${name}" 프로젝트를 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
      onDelete?.(id);
    }
  };

  return (
    <S.ProjectCard $selected={selected} onClick={onClick}>
      <S.ProjectBadge>{status}</S.ProjectBadge>
      <S.ProjectName>{name}</S.ProjectName>
      <S.ProjectDescription>{description}</S.ProjectDescription>

      <S.TagsContainer>
        {dataType.map((dataTag) => {
          const colors = tagColors[dataTag] || { bg: "#f1f5f9", color: "#475569" };
          return (
            <S.Tag key={dataTag} $bg={colors.bg} $color={colors.color}>
              {dataTag}
            </S.Tag>
          );
        })}
      </S.TagsContainer>

      <S.ProjectInfo>
        {/* <span>샘플: {sampleCount}</span> */}
        <span>업데이트: {lastUpdate}</span>
      </S.ProjectInfo>

      {onDelete && (
        <S.DeleteButton onClick={handleDelete} title="프로젝트 삭제">
          🗑️
        </S.DeleteButton>
      )}
    </S.ProjectCard>
  );
};
