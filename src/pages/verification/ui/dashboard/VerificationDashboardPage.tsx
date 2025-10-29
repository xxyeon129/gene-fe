/**
 * @description 품질검증 대시보드드 페이지
 */

import * as S from "./dashboardPage.styles";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { VERIFICATION_CURRENT_STATUS, VERIFICATION_DASHBOARD_SAMPLES } from "./verificationDashboard.const";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const labels = ["10/10", "10/11", "10/12", "10/13", "10/14"];

export const VerificationDashboardPage = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "통과",
        data: [230, 250, 270, 285, 300],
        borderColor: "#20C48B",
        backgroundColor: "rgba(32, 196, 139, 0.5)",
      },
      {
        label: "경고",
        data: [20, 40, 15, 10, 25],
        borderColor: "#F59E0C",
        backgroundColor: "rgba(245, 158, 11, 0.5)",
      },
      {
        label: "실패",
        data: [10, 15, 10, 5, 15],
        borderColor: "#EF4647",
        backgroundColor: "rgba(239, 70, 71, 0.5)",
      },
    ],
  };

  return (
    <S.PageArtcile>
      <S.ContentWrapper>
        {VERIFICATION_DASHBOARD_SAMPLES.map((sample, index) => (
          <S.WhiteBoxSection key={sample.label} $isLeftBorder $leftBorderIndex={index} $padding="1.5rem">
            <S.SampleLabel>{sample.label}</S.SampleLabel>
            <S.SampleCount $colorIndex={index}>{sample.count}</S.SampleCount>
            <S.SampleDescription>{sample.description}</S.SampleDescription>
          </S.WhiteBoxSection>
        ))}
      </S.ContentWrapper>

      <S.ContentWrapper>
        <S.WhiteBoxSection>
          <S.WhiteBoxSectionTitle>📊 품질 지표 현황</S.WhiteBoxSectionTitle>
          <S.CurrentStatusItem>
            {VERIFICATION_CURRENT_STATUS.map((status) => (
              <div key={status.label}>
                <S.StatusTextContainer>
                  <S.CurrentStatusLabel>{status.label}</S.CurrentStatusLabel>
                  <S.CurrentStatusScoreContainer>
                    <S.CurrentStatusStandard>기준: {status.standard}</S.CurrentStatusStandard>
                    <S.CurrentStatusScore>{status.score}</S.CurrentStatusScore>
                  </S.CurrentStatusScoreContainer>
                </S.StatusTextContainer>
                <S.CurrentStatusBar>
                  <S.CurrentStatusBarFill $score={status.score}>
                    <S.CurrentStatusBarStandardLine $standard={status.standard} />
                  </S.CurrentStatusBarFill>
                </S.CurrentStatusBar>
              </div>
            ))}
          </S.CurrentStatusItem>
        </S.WhiteBoxSection>

        <S.WhiteBoxSection>
          <S.WhiteBoxSectionTitle>📈 검증 추세</S.WhiteBoxSectionTitle>
          <Line data={data} options={options} />
        </S.WhiteBoxSection>
      </S.ContentWrapper>
    </S.PageArtcile>
  );
};
