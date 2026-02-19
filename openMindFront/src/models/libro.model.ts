export interface Libro {
  id?: number;
  titulo: string;
  descripcion: string;
  portada: string;
  paginas: number;
  archivoPdf: string;
  descargasTotales: number;
  vistasTotales: number;
}
