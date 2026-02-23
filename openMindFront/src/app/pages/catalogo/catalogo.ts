import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro } from '../../../models/libro.model';
import { LibroService } from '../../services/libro-service';
@Component({
  selector: 'app-catalogo',
  standalone: true, // Asegúrate de que sea standalone si no usas módulos
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  terminoBusqueda = '';
  // 1. Definimos libros como una Signal
  libros = signal<Libro[]>([]);
  librosFiltrados = signal<Libro[]>([]);

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros() {
    this.libroService.getAll().subscribe({
      next: (data) => {
        // 2. Seteamos el valor de la Signal
        this.libros.set(data);
        this.librosFiltrados.set(data);
      },
    });
  }

  filtrarLibros() {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    if (!termino) {
      this.librosFiltrados.set(this.libros());
      return;
    }
    // 3. Filtramos usando el valor actual de la Signal ()
    const filtrados = this.libros().filter(
      (libro) =>
        libro.titulo.toLowerCase().includes(termino) || libro.autor.toLowerCase().includes(termino),
    );
    this.librosFiltrados.set(filtrados);
  }
}
