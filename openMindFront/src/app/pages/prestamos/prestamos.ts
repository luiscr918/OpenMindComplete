import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { PrestamoService } from '../../services/prestamo-service';
import { LibroService } from '../../services/libro-service';
import { Prestamo } from '../../../models/prestamo.model';
import { Libro } from '../../../models/libro.model';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

interface PrestamoConPortada extends Prestamo {
  portada?: string;
}

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './prestamos.html',
  styleUrl: './prestamos.css',
})
export class Prestamos implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private prestamoService = inject(PrestamoService);
  private libroService = inject(LibroService);
  private cdr = inject(ChangeDetectorRef);

  cargando = true;
  prestamos = signal<PrestamoConPortada[]>([]);
  usuarioId = signal<number | null>(null);

  paginaActual = signal(1);
  itemsPorPagina = 5;

  prestamosOrdenados = computed(() =>
    [...this.prestamos()].sort((a, b) => (b.id ?? 0) - (a.id ?? 0)),
  );

  prestamosEnPagina = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.itemsPorPagina;
    return this.prestamosOrdenados().slice(inicio, inicio + this.itemsPorPagina);
  });

  totalPaginas = computed(() => Math.ceil(this.prestamos().length / this.itemsPorPagina));

  getPaginas(): number[] {
    return Array.from({ length: this.totalPaginas() }, (_, i) => i + 1);
  }

  cambiarPagina(p: number) {
    if (p >= 1 && p <= this.totalPaginas()) {
      this.paginaActual.set(p);
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const uId = Number(params.get('usuarioId'));
      if (uId) {
        this.usuarioId.set(uId);
        this.cargarPrestamos(uId);
      } else {
        this.router.navigate(['/catalogo']);
      }
    });
  }

  cargarPrestamos(usuarioId: number) {
    this.prestamoService.getByUsuario(usuarioId).subscribe({
      next: (prestamos) => {
        if (prestamos.length === 0) {
          this.prestamos.set([]);
          this.cargando = false;
          this.cdr.detectChanges();
          return;
        }

        const libros$ = prestamos.map((p) => this.libroService.getById(p.libroId));

        forkJoin(libros$).subscribe({
          next: (libros: Libro[]) => {
            const conPortadas: PrestamoConPortada[] = prestamos.map((p, i) => ({
              ...p,
              portada: libros[i]?.portada,
            }));
            this.prestamos.set(conPortadas);
            this.cargando = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.prestamos.set(prestamos);
            this.cargando = false;
            this.cdr.detectChanges();
          },
        });
      },
      error: () => this.router.navigate(['/catalogo']),
    });
  }

  devolver(id: number) {
    this.prestamoService.devolver(id).subscribe({
      next: () => {
        this.prestamos.update((lista) =>
          lista.map((p) => (p.id === id ? { ...p, estadoPrestamo: 'DEVUELTO' } : p)),
        );
      },
      error: (err) => console.error('Error al devolver', err),
    });
  }

  volver() {
    window.history.back();
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
}
