import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Libro {
  titulo: string;
  autor: string;
  categoria: string;
  imagen?: string;
}


@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  terminoBusqueda: string = '';
  libros: Libro[] = [
    {
      titulo: 'Cien Años de Soledad',
      autor: 'Gabriel García Márquez',
      categoria: 'Novela',
      imagen: 'https://images-na.ssl-images-amazon.com/images/I/81oAEEwxBWL.jpg'
    },
    {
      titulo: '1984',
      autor: 'George Orwell',
      categoria: 'Distopía',
      imagen: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg'
    },
    {
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      categoria: 'Ficción',
      imagen: 'https://i.postimg.cc/8cYQDY58/prin.webp'
    },
    {
      titulo: 'Don Quijote de la Mancha',
      autor: 'Miguel de Cervantes',
      categoria: 'Clásico',
      imagen: 'https://i.postimg.cc/YqXf2HM9/don.webp'
    },
    {
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      categoria: 'Ficción',
      imagen: 'https://i.postimg.cc/8cYQDY58/prin.webp'
    },
    {
      titulo: 'Don Quijote de la Mancha',
      autor: 'Miguel de Cervantes',
      categoria: 'Clásico',
      imagen: 'https://i.postimg.cc/YqXf2HM9/don.webp'
    }
  ];

  librosFiltrados: Libro[] = [];
  constructor() {
    this.librosFiltrados = this.libros;
  }
  filtrarLibros() {
    const termino = this.terminoBusqueda.toLowerCase();

    this.librosFiltrados = this.libros.filter(libro =>
      libro.titulo.toLowerCase().includes(termino) ||
      libro.autor.toLowerCase().includes(termino) ||
      libro.categoria.toLowerCase().includes(termino)
    );
  }
}


