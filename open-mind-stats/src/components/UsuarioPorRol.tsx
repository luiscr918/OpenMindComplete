import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { UsuarioDTO } from "../models";

export default function UsuariosPorRol({
  usuarios,
}: {
  usuarios: UsuarioDTO[];
}) {
  const conteo = usuarios.reduce(
    (acc, u) => {
      acc[u.rol] = (acc[u.rol] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const options: Highcharts.Options = {
    chart: { type: "pie" },
    title: { text: "Usuarios por rol" },
    colors: ["#0ea5e9", "#8b5cf6"],
    series: [
      {
        type: "pie",
        data: Object.entries(conteo).map(([name, y]) => ({ name, y })),
      },
    ],
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
