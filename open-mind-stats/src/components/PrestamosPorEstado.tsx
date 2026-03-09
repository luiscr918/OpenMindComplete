import type { PrestamoDTO } from "../models";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function PrestamosPorEstado({
  prestamos,
}: {
  prestamos: PrestamoDTO[];
}) {
  const conteo = prestamos.reduce(
    (acc, p) => {
      acc[p.estadoPrestamo] = (acc[p.estadoPrestamo] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const options: Highcharts.Options = {
    chart: { type: "pie" },
    title: { text: "Préstamos por estado" },
    colors: ["#3b82f6", "#22c55e", "#ef4444"],
    series: [
      {
        type: "pie",
        innerSize: "50%",
        data: Object.entries(conteo).map(([name, y]) => ({ name, y })),
      },
    ],
    credits: { enabled: false },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
