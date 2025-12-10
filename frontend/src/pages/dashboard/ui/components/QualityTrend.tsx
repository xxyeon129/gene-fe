import { useEffect, useState } from "react";
import { apiClient } from "@/shared/api";
import * as S from "./qualityTrend.styles";
import type { Project } from "@/entities";

export const QualityTrend = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = (await apiClient.getProjects()) as Project[];
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <S.ChartContainer>
        <div style={{
          padding: "2rem",
          textAlign: "center",
          color: "#6b7280",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px"
        }}>
          데이터를 불러오는 중...
        </div>
      </S.ChartContainer>
    );
  }

  // 프로젝트별로 데이터셋 그룹화
  interface ProjectDatasets {
    projectName: string;
    datasets: {
      name: string;
      completeness: number;
      color: string;
    }[];
  }

  const projectGroups: ProjectDatasets[] = projects
    .map((project) => {
      const datasets = [];

      // DNA 완전성
      if (project.DNA_qualityScore !== undefined && project.DNA_qualityScore !== null) {
        datasets.push({
          name: "DNA",
          completeness: project.DNA_qualityScore,
          color: "#3b82f6", // 파란색
        });
      }

      // RNA 완전성
      if (project.RNA_qualityScore !== undefined && project.RNA_qualityScore !== null) {
        datasets.push({
          name: "RNA",
          completeness: project.RNA_qualityScore,
          color: "#f59e0b", // 주황색
        });
      }

      // Methyl 완전성
      if (project.Methyl_qualityScore !== undefined && project.Methyl_qualityScore !== null) {
        datasets.push({
          name: "Methyl",
          completeness: project.Methyl_qualityScore,
          color: "#10b981", // 녹색
        });
      }

      // Protein 완전성
      if (project.Protein_qualityScore !== undefined && project.Protein_qualityScore !== null) {
        datasets.push({
          name: "Protein",
          completeness: project.Protein_qualityScore,
          color: "#8b5cf6", // 보라색
        });
      }

      return {
        projectName: project.name,
        datasets: datasets,
      };
    })
    .filter((group) => group.datasets.length > 0)
    .slice(0, 5); // 상위 5개 프로젝트만 표시

  return (
    <S.ChartContainer>
      <div style={{ padding: "1.75rem" }}>
        <h3 style={{
          marginBottom: "1.25rem",
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "#111827",
          paddingBottom: "0.75rem",
          borderBottom: "2px solid #f3f4f6"
        }}>
          📊 프로젝트별 데이터셋 완전성
        </h3>
        {projectGroups.length === 0 ? (
          <div style={{
            padding: "3rem 2rem",
            textAlign: "center",
            color: "#9ca3af",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            border: "1px dashed #e5e7eb"
          }}>
            데이터셋 완전성 정보가 없습니다.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {projectGroups.map((projectGroup, projectIndex) => (
              <div
                key={projectIndex}
                style={{
                  backgroundColor: "#fafbfc",
                  borderRadius: "10px",
                  padding: "1.125rem 1.25rem",
                  border: "1px solid #e9ecef",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.04)";
                  e.currentTarget.style.borderColor = "#e9ecef";
                }}
              >
                <div style={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "#1f2937",
                  marginBottom: "0.875rem",
                  paddingBottom: "0.625rem",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  {projectGroup.projectName}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {projectGroup.datasets.map((dataset, datasetIndex) => (
                    <div key={datasetIndex} style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                      <div style={{
                        minWidth: "70px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: dataset.color,
                        textAlign: "left",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        {dataset.name}
                      </div>
                      <div style={{ flex: 1, height: "22px", backgroundColor: "#e9ecef", borderRadius: "6px", overflow: "hidden", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${dataset.completeness}%`,
                            backgroundColor: dataset.color,
                            transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            paddingRight: "0.5rem",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            color: "white",
                            textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                          }}
                        >
                          {dataset.completeness >= 15 && `${dataset.completeness.toFixed(1)}%`}
                        </div>
                      </div>
                      {dataset.completeness < 15 && (
                        <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#374151", width: "50px", textAlign: "right" }}>
                          {dataset.completeness.toFixed(1)}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </S.ChartContainer>
  );
};
