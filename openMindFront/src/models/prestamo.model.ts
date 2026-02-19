export type EstadoPrestamo = 'ACTIVO' | 'DEVUELTO' | 'ATRASADO'; 
// ⚠️ Ajusta según tu enum real

export interface Prestamo {
  id?: number;
  fechaSalida: string; // LocalDate → string
  fechaDevolucion: string;
  estadoPrestamo: EstadoPrestamo;
  usuarioId: number;
  nombreUsuario: string;
  libroId: number;
  tituloLibro: string;
}
