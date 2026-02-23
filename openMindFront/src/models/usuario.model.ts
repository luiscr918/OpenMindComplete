export type Rol = 'ADMIN' | 'AUTOR' | 'LECTOR';
// Ajusta según tu enum real

export interface Usuario {
  id?: number;
  rol: Rol;
  email: string;
  nombreCompleto: string;
  intereses: string;
  edad: number;
  ocupacion: string;
}
