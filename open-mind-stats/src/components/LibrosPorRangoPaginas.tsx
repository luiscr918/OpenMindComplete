import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { LibroDTO } from "../models";

export default function LibrosPorRangoPaginas({
  libros,
}: {
  libros: LibroDTO[];
}) {
  const rangos = { "Corto (<200)": 0, "Medio (200-400)": 0, "Largo (>400)": 0 };
  libros.forEach((l) => {
    if (l.paginas < 200) rangos["Corto (<200)"]++;
    else if (l.paginas <= 400) rangos["Medio (200-400)"]++;
    else rangos["Largo (>400)"]++;
  });

  const options: Highcharts.Options = {
    chart: { type: "pie" },
    title: { text: "Libros por rango de páginas" },
    colors: ["#f97316", "#a855f7", "#14b8a6"],
    series: [
      {
        type: "pie",
        innerSize: "40%",
        data: Object.entries(rangos).map(([name, y]) => ({ name, y })),
      },
    ],
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
