import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroService } from '../../services/libro-service';
import { Libro } from '../../../models/libro.model';
import { PrestamoService } from '../../services/prestamo-service';
import { AuthService } from '../../services/auth-service';
import { UsuarioService } from '../../services/usuario-service';
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
  private libroService = inject(LibroService);
  private prestamoService = inject(PrestamoService);
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);

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
            // Incrementar vistas en el servidor
            this.libroService.incrementarVistas(+id).subscribe({
              next: (libroActualizado) => {
                console.log('✅ Vistas incrementadas:', libroActualizado.vistasTotales);
                this.libro.set(libroActualizado);
              },
              error: (err) => {
                console.error(' Error incrementando vistas:', err);
                // Si falla el servidor, incrementar localmente
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

    this.cargando.set(true);
    this.mensaje.set(null);

    // Obtener el usuario completo por email para tener el id
    this.usuarioService.getByEmail(email).subscribe({
      next: (usuario) => {
        const prestamo = {
          fechaSalida: new Date().toISOString().split('T')[0],
          fechaDevolucion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          estadoPrestamo: 'ACTIVO' as const,
          usuarioId: usuario.id!,
          nombreUsuario: usuario.nombreCompleto,
          libroId: libroActual.id!,
          tituloLibro: libroActual.titulo
        };

        this.prestamoService.create(prestamo)
          .subscribe({
            next: () => {

              // bajar stock visualmente
              this.libro.update(l => l ? {
                ...l,
                stock: (l.stock ?? 0) - 1
              } : null);

              this.mensaje.set("Préstamo realizado con éxito");
              this.cargando.set(false);
            },
            error: (err) => {
              this.mensaje.set("⚠ Error al solicitar préstamo");
              this.cargando.set(false);
            }
          });
      },
      error: (err) => {
        this.mensaje.set("⚠ Error al obtener datos del usuario");
        this.cargando.set(false);
      }
    });
  }

}