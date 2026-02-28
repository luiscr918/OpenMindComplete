import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  usuarioFirebase = this.authService.usuarioFirebase;
  estaLogueado = computed(() => !!this.usuarioFirebase());
  usuarioDB = signal<Usuario | null>(null);

  menuPrincipal = [
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Contacto', path: '/contactos' },
  ];

  constructor() {
    effect(() => {
      const user = this.usuarioFirebase();

      if (user === undefined) return; // cargando

      if (!user) {
        this.usuarioDB.set(null);
        return;
      }

      if (user.email) {
        this.usuarioService.getByEmail(user.email).subscribe({
          next: (u) => this.usuarioDB.set(u),
          error: () => this.usuarioDB.set(null),
        });
      }
    });
  }

  irAMisPrestamos() {
    const id = this.usuarioDB()?.id;
    if (id) this.router.navigate([`/mis-prestamos/${id}`]);
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
