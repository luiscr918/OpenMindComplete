import { inject, Injectable, signal } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  authState, // Importante: Observa el estado en tiempo real
  User 
} from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { from, switchMap } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/usuarios`;

  // 1. Creamos una Signal para el usuario de Firebase
  // null = no logueado, undefined = cargando
  usuarioFirebase = signal<User | null | undefined>(undefined);

  constructor() {
    // 2. Nos suscribimos al estado de autenticación de Firebase
    authState(this.auth).subscribe((user) => {
      this.usuarioFirebase.set(user);
    });
  }

  // Método rápido para obtener el email
  obtenerEmailActual() {
    return this.usuarioFirebase()?.email;
  }

  registrar(usuario: Usuario, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, usuario.email, password)).pipe(
      switchMap(() => this.http.post<Usuario>(this.apiUrl, usuario)),
    );
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(signOut(this.auth));
  }
}