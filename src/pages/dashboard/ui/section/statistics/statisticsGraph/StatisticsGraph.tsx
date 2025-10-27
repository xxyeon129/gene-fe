import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import * as S from "./graph.styles";
import { GrayBackgroundBox, GrayBackgroundBoxLabel, GrayBackgroundBoxValue } from "@/shared";

const St = { GrayBackgroundBox, GrayBackgroundBoxLabel, GrayBackgroundBoxValue };

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartData = {
  labels: ["0-2", "2-4", "4-6", "6-8", "8-10"],
  datasets: [
    {
      // label: "# of Votes",
      data: [8000, 17000, 23000, 11000, 4000],
      backgroundColor: "#2C6DEF",
      borderWidth: 0,
      borderRadius: 10,
    },
  ],
};

const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
};

export const StatisticsGraph = () => {
  return (
    <S.GraphContainer>
      <S.Title>데이터 분포</S.Title>
      <S.ChartWrapper>
        <Bar data={chartData} options={chartOptions} />
      </S.ChartWrapper>
      <St.GrayBackgroundBox>
        <St.GrayBackgroundBoxLabel>행렬 크기 정보</St.GrayBackgroundBoxLabel>
        <St.GrayBackgroundBoxValue>1,226 samples x 60,660 features</St.GrayBackgroundBoxValue>
      </St.GrayBackgroundBox>
    </S.GraphContainer>
  );
};
