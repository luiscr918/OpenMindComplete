import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UsuarioService } from '../../services/usuario-service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Navbar],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private usuarioService = inject(UsuarioService);

  loginForm: FormGroup;
  mensaje = signal('');
  cargando = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.cargando.set(true);
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (userCredential) => {
          this.mensaje.set('¡Bienvenido de nuevo!');

          // Buscar rol en el backend y redirigir según rol
          this.usuarioService.getByEmail(email).subscribe({
            next: (u) => {
              setTimeout(() => {
                if (u.rol === 'ADMIN') {
                  this.router.navigate(['/dashboard']);
                } else {
                  this.router.navigate(['/catalogo']);
                }
              }, 1500);
            },
            error: () => {
              setTimeout(() => this.router.navigate(['/']), 1500);
            },
          });
        },
        error: (err) => {
          this.cargando.set(false);
          if (err.code === 'auth/invalid-credential') {
            this.mensaje.set('Correo o contraseña incorrectos.');
          } else {
            this.mensaje.set('Ocurrió un error al iniciar sesión.');
          }
        },
      });
    }
  }
}
