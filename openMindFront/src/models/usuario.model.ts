export type Rol = 'ADMIN' | 'AUTOR' | 'LECTOR';
// Ajusta según tu enum real

export interface Usuario {
  id?: number;
  rol: Rol;
  email: string;
  password?: string; // opcional porque no siempre viene
  nombreCompleto: string;
  intereses: string;
  edad: number;
  ocupacion: string;
}
