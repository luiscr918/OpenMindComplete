import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { LibroDTO } from "../models";

export default function Top5Descargados({ libros }: { libros: LibroDTO[] }) {
  const top = [...libros]
    .sort((a, b) => b.descargasTotales - a.descargasTotales)
    .slice(0, 5);

  const options: Highcharts.Options = {
    chart: { type: "bar" },
    title: { text: "Top 5 libros más descargados" },
    xAxis: { categories: top.map((l) => l.titulo), title: { text: null } },
    yAxis: { title: { text: "Descargas" }, min: 0 },
    series: [
      {
        type: "bar",
        name: "Descargas",
        data: top.map((l) => l.descargasTotales),
        color: "#f59e0b",
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
