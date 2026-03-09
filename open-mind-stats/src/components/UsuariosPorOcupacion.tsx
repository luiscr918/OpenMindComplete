import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { UsuarioDTO } from "../models";

export default function UsuariosPorOcupacion({
  usuarios,
}: {
  usuarios: UsuarioDTO[];
}) {
  const conteo = usuarios.reduce(
    (acc, u) => {
      const key = u.ocupacion || "Sin especificar";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const sorted = Object.entries(conteo).sort((a, b) => b[1] - a[1]);

  const options: Highcharts.Options = {
    chart: { type: "column" },
    title: { text: "Usuarios por ocupación" },
    xAxis: { categories: sorted.map(([k]) => k), crosshair: true },
    yAxis: { min: 0, title: { text: "Cantidad" } },
    series: [
      {
        type: "column",
        name: "Usuarios",
        data: sorted.map(([, v]) => v),
        color: "#10b981",
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
