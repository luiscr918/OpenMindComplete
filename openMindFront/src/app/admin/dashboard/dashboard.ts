import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { UsuarioService } from '../../services/usuario-service';
import { LibroService } from '../../services/libro-service';
import { PrestamoService } from '../../services/prestamo-service';
import { Usuario } from '../../../models/usuario.model';
import { Libro } from '../../../models/libro.model';
import { Prestamo } from '../../../models/prestamo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  private libroService = inject(LibroService);
  private prestamoService = inject(PrestamoService);
  private router = inject(Router);

  seccionActiva = signal<'estadisticas' | 'usuarios' | 'libros' | 'prestamos'>('estadisticas');

  usuarioDB = signal<Usuario | null>(null);
  usuarios = signal<Usuario[]>([]);
  libros = signal<Libro[]>([]);
  prestamos = signal<Prestamo[]>([]);
  cargando = signal(true);
  busquedaPrestamo = signal('');

  // Estadísticas computed
  totalUsuarios = computed(() => this.usuarios().length);
  totalLibros = computed(() => this.libros().length);
  totalPrestamos = computed(() => this.prestamos().length);
  prestamosActivos = computed(
    () => this.prestamos().filter((p) => p.estadoPrestamo === 'ACTIVO').length,
  );
  prestamosDevueltos = computed(
    () => this.prestamos().filter((p) => p.estadoPrestamo === 'DEVUELTO').length,
  );

  constructor() {
    effect(() => {
      const user = this.authService.usuarioFirebase();
      if (user === undefined) return;
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      if (user.email) {
        this.usuarioService.getByEmail(user.email).subscribe({
          next: (u) => this.usuarioDB.set(u),
        });
      }
    });

    this.cargarTodo();
  }

  cargarTodo() {
    this.usuarioService.getAll().subscribe({ next: (data) => this.usuarios.set(data) });
    this.libroService.getAll().subscribe({ next: (data) => this.libros.set(data) });
    this.prestamoService.getAll().subscribe({
      next: (data) => {
        this.prestamos.set(data);
        this.cargando.set(false);
      },
    });
  }

  eliminarUsuario(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Eliminar este usuario?')) {
      this.usuarioService.delete(id).subscribe({
        next: () => this.usuarios.update((list) => list.filter((u) => u.id !== id)),
      });
    }
  }

  eliminarLibro(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Eliminar este libro?')) {
      this.libroService.delete(id).subscribe({
        next: () => this.libros.update((list) => list.filter((l) => l.id !== id)),
      });
    }
  }

  devolverPrestamo(id: number | undefined) {
    if (!id) return;
    this.prestamoService.devolver(id).subscribe({
      next: () =>
        this.prestamos.update((list) =>
          list.map((p) => (p.id === id ? { ...p, estadoPrestamo: 'DEVUELTO' } : p)),
        ),
    });
  }

  getEstadoClass(estado: string): string {
    const base = 'text-xs font-semibold px-2 py-1 rounded-full ';
    switch (estado) {
      case 'ACTIVO':
        return base + 'bg-blue-100 text-blue-700';
      case 'DEVUELTO':
        return base + 'bg-green-100 text-green-700';
      case 'ATRASADO':
        return base + 'bg-red-100 text-red-700';
      default:
        return base + 'bg-gray-100 text-gray-600';
    }
  }
  prestamosFiltrados = computed(() => {
    const termino = this.busquedaPrestamo().toLowerCase().trim();
    if (!termino) return this.prestamos();
    return this.prestamos().filter((p) => p.nombreUsuario.toLowerCase().includes(termino));
  });

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
