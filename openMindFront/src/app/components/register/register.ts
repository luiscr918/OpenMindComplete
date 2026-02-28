import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { Usuario } from '../../../models/usuario.model';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Navbar],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;
  mensaje = signal('');
  cargando = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombreCompleto: ['', [Validators.required]],
      intereses: [''],
      edad: [18, [Validators.required, Validators.min(0)]],
      ocupacion: [''],
      rol: ['LECTOR'], // Valor por defecto
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.cargando.set(true);
      const { password, ...datosUsuario } = this.registerForm.value;

      this.authService.registrar(datosUsuario as Usuario, password).subscribe({
        next: () => {
          this.mensaje.set('¡Cuenta creada y perfil guardado con éxito!');
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.cargando.set(false);
          this.mensaje.set('Error: ' + (err.message || 'No se pudo completar el registro'));
          console.error(err);
        },
      });
    }
  }
}
