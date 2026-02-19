import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual = new BehaviorSubject<Usuario | null>(null);
  public usuarioActual$ = this.usuarioActual.asObservable();

  private isLoggedIn = new BehaviorSubject<boolean>(this.checkIfLoggedIn());
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor() {
    this.cargarUsuarioDelStorage();
  }

  private checkIfLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  private cargarUsuarioDelStorage(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioActual.next(JSON.parse(usuario));
    }
  }

  login(email: string, password: string): void {
    // Simulación de login - en producción, llamarías a tu API
    const usuario: Usuario = {
      id: 1,
      nombre: 'Juan Pérez',
      email: email,
      rol: 'usuario'
    };
    
    localStorage.setItem('token', 'token_simulado_' + Date.now());
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    this.usuarioActual.next(usuario);
    this.isLoggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioActual.next(null);
    this.isLoggedIn.next(false);
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioActual.value;
  }

  estaLogueado(): boolean {
    return this.isLoggedIn.value;
  }
}
