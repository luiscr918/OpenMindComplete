import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { LibroDTO } from "../models";

export default function Top5Vistos({ libros }: { libros: LibroDTO[] }) {
  const top = [...libros]
    .sort((a, b) => b.vistasTotales - a.vistasTotales)
    .slice(0, 5);

  const options: Highcharts.Options = {
    chart: { type: "bar" },
    title: { text: "Top 5 libros más vistos" },
    xAxis: { categories: top.map((l) => l.titulo), title: { text: null } },
    yAxis: { title: { text: "Vistas" }, min: 0 },
    series: [
      {
        type: "bar",
        name: "Vistas",
        data: top.map((l) => l.vistasTotales),
        color: "#6366f1",
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
