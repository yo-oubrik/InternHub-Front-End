"use client";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  scales,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  scales
);
type barGraphStyleOptions = {
  backgorundColor?: string;
  borderColor?: string;
  borderWidth?: number;
};
interface IBarGraph {
  chartLabel?: string;
  xAxis: string[];
  yAxis: number[];
  options?: barGraphStyleOptions;
}
export const BarGraph: React.FC<IBarGraph> = ({ chartLabel, xAxis, yAxis }) => {
  const options = {
    backgroundColor: "hsl(12, 100%, 70%)",
    borderColor: "hsl(12, 100%, 60%)",
    borderWidth: 1,
  };
  const chartData = {
    labels: xAxis,
    datasets: [{ label: chartLabel, data: yAxis }],
  };
  return <Bar data={chartData} options={options} />;
};
