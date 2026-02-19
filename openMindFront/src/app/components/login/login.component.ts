import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  mensajeError = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion(): void {
    if (!this.email || !this.password) {
      this.mensajeError = 'Por favor completa todos los campos';
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    try {
      this.authService.login(this.email, this.password);
      
      // En producción, espera la respuesta del servidor
      setTimeout(() => {
        this.cargando = false;
        alert('¡Bienvenido! Sesión iniciada correctamente');
        this.router.navigate(['/']);
      }, 500);
    } catch (error) {
      this.cargando = false;
      this.mensajeError = 'Error al iniciar sesión. Verifica tus credenciales.';
    }
  }
}
