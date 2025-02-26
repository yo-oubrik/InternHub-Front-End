"use client";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
interface LineGraphProps {
  xAxis: string[];
  yAxis: number[];
  chartLabel: string;
}

export const LineGraph: React.FC<LineGraphProps> = ({
  xAxis,
  yAxis,
  chartLabel,
}) => {
  const data = {
    labels: xAxis,
    datasets: [
      {
        label: chartLabel,
        data: yAxis,
        fill: false,
        borderColor: "hsl(12, 100%, 60%)",
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div>
      <h3 className="text-center text-2xl mb-3 text-slate-600">{chartLabel}</h3>
      <Line data={data} options={options} />
    </div>
  );
};
