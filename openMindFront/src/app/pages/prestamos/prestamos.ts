import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Prestamo {
  titulo: string;
  autor: string;
  fechaPrestamo: Date;
  fechaDevolucion: Date;
  estado: 'Activo' | 'Vencido' | 'Devuelto';
  imagen?: string;
}

@Component({
  selector: 'app-prestamos',
  imports: [CommonModule],
  templateUrl: './prestamos.html',
  styleUrl: './prestamos.css',
})
export class Prestamos {
  prestamos: Prestamo[] = [];

    constructor() {
    // Datos de prueba, luego vendrán del backend
    this.prestamos = [
      {
        titulo: 'Cien Años de Soledad',
        autor: 'Gabriel García Márquez',
        fechaPrestamo: new Date('2026-02-10'),
        fechaDevolucion: new Date('2026-03-10'),
        estado: 'Activo',
        imagen: 'https://images-na.ssl-images-amazon.com/images/I/81oAEEwxBWL.jpg'
      },
      {
        titulo: '1984',
        autor: 'George Orwell',
        fechaPrestamo: new Date('2026-01-05'),
        fechaDevolucion: new Date('2026-02-05'),
        estado: 'Vencido',
        imagen: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg'
      },
      {
        titulo: 'El Principito',
        autor: 'Antoine de Saint-Exupéry',
        fechaPrestamo: new Date('2026-02-01'),
        fechaDevolucion: new Date('2026-02-15'),
        estado: 'Devuelto',
        imagen: 'https://i.postimg.cc/8cYQDY58/prin.webp'
      }
    ];
  }

}
