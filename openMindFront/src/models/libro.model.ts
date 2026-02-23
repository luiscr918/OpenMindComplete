export interface Libro {
  id?: number;
  autor:string;
  titulo: string;
  descripcion: string;
  portada: string;
  paginas: number;
  archivoPdf: string;
  descargasTotales: number;
  vistasTotales: number;
  stock:number
}
