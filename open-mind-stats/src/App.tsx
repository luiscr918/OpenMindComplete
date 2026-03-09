import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import type { LibroDTO, PrestamoDTO, UsuarioDTO } from "./models";
import { getLibros, getPrestamos, getUsuarios } from "./api/mainApi";
import PrestamosPorEstado from "./components/PrestamosPorEstado";
import UsuariosPorRol from "./components/UsuarioPorRol";
import Top5Vistos from "./components/Top5Vistos";
import Top5Descargados from "./components/Top5Descargados";
import PrestamosPorMes from "./components/PrestamosPorMes";
import LibrosPorRangoPaginas from "./components/LibrosPorRangoPaginas";
import UsuariosPorOcupacion from "./components/UsuariosPorOcupacion";

export default function App() {
  const [libros, setLibros] = useState<LibroDTO[]>([]);
  const [prestamos, setPrestamos] = useState<PrestamoDTO[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getLibros(), getPrestamos(), getUsuarios()])
      .then(([l, p, u]) => {
        setLibros(l);
        setPrestamos(p);
        setUsuarios(u);
      })
      .catch(() =>
        setError(
          "No se pudo conectar con el backend. ¿Está corriendo en :8080?",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const activos = prestamos.filter((p) => p.estadoPrestamo === "ACTIVO").length;
  const devueltos = prestamos.filter(
    (p) => p.estadoPrestamo === "DEVUELTO",
  ).length;

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Cargando datos...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">🧠 OpenMind</h1>
          <p className="text-gray-500 mt-1">Dashboard de estadísticas</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total usuarios" value={usuarios.length} />
          <StatCard label="Total libros" value={libros.length} />
          <StatCard label="Total préstamos" value={prestamos.length} />
          <StatCard
            label="Préstamos activos"
            value={activos}
            color="text-blue-600"
          />
          <StatCard
            label="Préstamos devueltos"
            value={devueltos}
            color="text-green-600"
          />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <PrestamosPorEstado prestamos={prestamos} />
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <UsuariosPorRol usuarios={usuarios} />
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <Top5Vistos libros={libros} />
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <Top5Descargados libros={libros} />
          </div>
        </div>

        {/* Charts row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <PrestamosPorMes prestamos={prestamos} />
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <LibrosPorRangoPaginas libros={libros} />
          </div>
        </div>

        {/* Full width */}
        <div className="bg-white rounded-xl shadow p-4">
          <UsuariosPorOcupacion usuarios={usuarios} />
        </div>
      </div>
    </div>
  );
}
