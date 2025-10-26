import * as S from "./projectList.styles";
import { DASHBOARD_PROJECTS } from "@/pages/dashboard/consts/dashboard.const";
import { FaCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";

export const ProjectList = () => {
  const contentItems = [
    { label: "샘플 수", key: "sampleCount" as const },
    { label: "데이터 파일", key: "fileCount" as const },
    { label: "총 용량", key: "size" as const },
  ];

  return (
    <S.ProjectList>
      {DASHBOARD_PROJECTS.map((project) => (
        <S.ProjectItem key={project.id}>
          <S.ProjectItemHeader>
            <S.ProjectItemInfo>
              <S.ProjectItemTitle>{project.name}</S.ProjectItemTitle>
              <S.ProjectItemDescription>{project.description}</S.ProjectItemDescription>
            </S.ProjectItemInfo>
            <S.ProjectItemStatus $status={project.status}>
              {project.status === "진행중" ? <FaCircle /> : <FaCheck />}
              {project.status}
            </S.ProjectItemStatus>
          </S.ProjectItemHeader>

          <S.ProjectItemContent>
            {contentItems.map(({ label, key }) => (
              <S.ProjectItemContentItem key={key}>
                <S.ProjectItemContentItemTitle>{label}</S.ProjectItemContentItemTitle>
                <S.ProjectItemContentItemValue>
                  {project[key]}
                  {key === "fileCount" ? "개" : ""}
                </S.ProjectItemContentItemValue>
              </S.ProjectItemContentItem>
            ))}
          </S.ProjectItemContent>

          <S.ProjectItemBottomInfo>
            <S.CurrentStatus $status={project.currentStatus}>
              {project.currentStatus === "진행중" ? (
                <MdOutlineRefresh />
              ) : project.currentStatus === "대기" ? (
                <FaRegCircle />
              ) : (
                <FaCheck />
              )}
              {project.currentStatus}
            </S.CurrentStatus>
            <S.Date>{project.createdAt}</S.Date>
          </S.ProjectItemBottomInfo>
        </S.ProjectItem>
      ))}
    </S.ProjectList>
  );
};
