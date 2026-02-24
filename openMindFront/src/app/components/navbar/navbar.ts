import { NgFor, NgIf } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
   private authService = inject(AuthService);

  usuario = this.authService.usuarioFirebase;
  estaLogueado = computed(() => !!this.usuario());

  // Secciones principales (SIEMPRE visibles)
  menuPrincipal = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Contacto', path: '/contactos' }
  ];

  logout() {
    this.authService.logout().subscribe();
  }
}
