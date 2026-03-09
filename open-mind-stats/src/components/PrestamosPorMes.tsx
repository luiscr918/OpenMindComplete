import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { PrestamoDTO } from "../models";

const MESES = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export default function PrestamosPorMes({
  prestamos,
}: {
  prestamos: PrestamoDTO[];
}) {
  const conteo = Array(12).fill(0);
  prestamos.forEach((p) => {
    if (p.fechaSalida) {
      const mes = new Date(p.fechaSalida).getMonth();
      conteo[mes]++;
    }
  });

  const options: Highcharts.Options = {
    chart: { type: "column" },
    title: { text: "Préstamos por mes" },
    xAxis: { categories: MESES },
    yAxis: { min: 0, title: { text: "Préstamos" } },
    series: [
      { type: "column", name: "Préstamos", data: conteo, color: "#3b82f6" },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
