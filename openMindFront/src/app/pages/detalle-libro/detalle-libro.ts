import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../services/libro-service';
import { Libro } from '../../../models/libro.model';
import { AuthService } from '../../services/auth-service';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  templateUrl: './detalle-libro.html',
  styleUrl: './detalle-libro.css',
  imports: [Navbar, Footer]
})
export class DetalleLibro {

  private route = inject(ActivatedRoute);
  private router = inject(Router); // ⭐ nuevo
  private libroService = inject(LibroService);
  private authService = inject(AuthService);

  libro = signal<Libro | null>(null);
  cargando = signal(false);
  mensaje = signal<string | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.libroService.getById(+id)
        .subscribe({
          next: (data) => {
            this.libro.set(data);

            // Incrementar vistas
            this.libroService.incrementarVistas(+id).subscribe({
              next: (libroActualizado) => {
                this.libro.set(libroActualizado);
              },
              error: () => {
                this.libro.update(l => l ? {
                  ...l,
                  vistasTotales: (l.vistasTotales || 0) + 1
                } : null);
              }
            });
          },
          error: (err) => console.error('Error cargando libro', err)
        });
    }
  }

  solicitarPrestamo() {
    const libroActual = this.libro();
    const email = this.authService.obtenerEmailActual();

    if (!libroActual || !email) {
      this.mensaje.set("Debes iniciar sesión");
      return;
    }

    if (libroActual.stock === 0) {
      this.mensaje.set("No hay stock disponible");
      return;
    }

    // ⭐ SOLO NAVEGAR AL FORMULARIO
    this.router.navigate(['/register-prestamo', libroActual.id]);
  }
}