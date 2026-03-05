import axios from "axios";
import type { LibroDTO, PrestamoDTO, UsuarioDTO } from "../models/index";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getLibros = (): Promise<LibroDTO[]> =>
  api.get<LibroDTO[]>("/libros").then((r) => r.data);

export const getPrestamos = (): Promise<PrestamoDTO[]> =>
  api.get<PrestamoDTO[]>("/prestamos").then((r) => r.data);

export const getUsuarios = (): Promise<UsuarioDTO[]> =>
  api.get<UsuarioDTO[]>("/usuarios").then((r) => r.data);
