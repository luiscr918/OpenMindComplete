export interface LibroDTO {
  id: number;
  autor: string;
  titulo: string;
  descripcion: string;
  portada: string;
  paginas: number;
  archivoPdf: string;
  descargasTotales: number;
  vistasTotales: number;
  stock: number;
}

export interface PrestamoDTO {
  id: number;
  fechaSalida: string;
  fechaDevolucion: string | null;
  estadoPrestamo: 'ACTIVO' | 'DEVUELTO' | 'ATRASADO';
  usuarioId: number;
  nombreUsuario: string;
  libroId: number;
  tituloLibro: string;
}

export interface UsuarioDTO {
  id: number;
  rol: 'ADMIN' | 'USUARIO';
  email: string;
  nombreCompleto: string;
  intereses: string;
  edad: number;
  ocupacion: string;
}