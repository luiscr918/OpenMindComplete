import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios implements OnInit {
  // Signals para el estado
  usuarios = signal<Usuario[]>([]);
  terminoBusqueda = signal('');
  paginaActual = signal(1);
  itemsPorPagina = 10;

  // Signal computada para filtrar
  usuariosFiltrados = computed(() => {
    const termino = this.terminoBusqueda().toLowerCase().trim();
    if (!termino) return this.usuarios();

    return this.usuarios().filter(
      (u) =>
        u.nombreCompleto.toLowerCase().includes(termino) || u.email.toLowerCase().includes(termino),
    );
  });

  // Signal computada para la paginación
  usuariosPaginados = computed(() => {
    const inicio = (this.paginaActual() - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.usuariosFiltrados().slice(inicio, fin);
  });

  totalPaginas = computed(() => Math.ceil(this.usuariosFiltrados().length / this.itemsPorPagina));

  constructor(private UsuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.UsuarioService.getAll().subscribe({
      next: (data) => this.usuarios.set(data),
      error: (err) => console.error('Error al cargar usuarios', err),
    });
  }

  eliminarUsuario(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.UsuarioService.delete(id).subscribe({
        next: () => {
          this.usuarios.set(this.usuarios().filter((u) => u.id !== id));
        },
      });
    }
  }

  cambiarPagina(p: number) {
    if (p >= 1 && p <= this.totalPaginas()) {
      this.paginaActual.set(p);
    }
  }
}
