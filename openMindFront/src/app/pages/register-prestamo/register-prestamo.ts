import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { LibroService } from '../../services/libro-service';
import { UsuarioService } from '../../services/usuario-service';
import { AuthService } from '../../services/auth-service';
import { PrestamoService } from '../../services/prestamo-service';
import { Prestamo } from '../../../models/prestamo.model';

@Component({
  selector: 'app-register-prestamo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-prestamo.html',
  styleUrl: './register-prestamo.css',
})
export class RegisterPrestamo implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private libroService = inject(LibroService);
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);
  private prestamoService = inject(PrestamoService);
  private cdr = inject(ChangeDetectorRef); // ⭐ clave

  cargando = true;
libroId = signal<number | null>(null);

// ⭐ helper fecha local
getFechaLocal(): string {
  return new Date().toLocaleDateString('en-CA');
}

nuevoPrestamo: Prestamo = {
  fechaSalida: this.getFechaLocal(),
  estadoPrestamo: 'ACTIVO',
  usuarioId: 0,
  nombreUsuario: '',
  libroId: 0,
  tituloLibro: '',
};

  constructor() {
    effect(() => {
      const user = this.authService.usuarioFirebase();
      const id = this.libroId();

      if (user === undefined || id === null) return;

      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      if (user.email && this.cargando) {
        this.cargarDatos(id, user.email);
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) this.libroId.set(id);
    });
  }

  cargarDatos(libroId: number, email: string) {
    this.libroService.getById(libroId).pipe(
      switchMap(libro => {
        this.nuevoPrestamo.libroId = libro.id!;
        this.nuevoPrestamo.tituloLibro = libro.titulo;
        return this.usuarioService.getByEmail(email);
      })
    ).subscribe({
      next: usuario => {
        this.nuevoPrestamo.usuarioId = usuario.id!;
        this.nuevoPrestamo.nombreUsuario = usuario.nombreCompleto;
        this.cargando = false;

        this.cdr.detectChanges(); // ⭐ SOLUCIÓN CTRL+S
      },
      error: () => this.router.navigate(['/catalogo'])
    });
  }

  cancelar() {
    window.history.back();
  }

  guardarPrestamo() {
    this.prestamoService.create(this.nuevoPrestamo).subscribe({
      next: () => {
        alert('Préstamo realizado con éxito');
        this.router.navigate(['/catalogo']);
      },
      error: err => console.error('Error al crear préstamo', err),
    });
  }
}