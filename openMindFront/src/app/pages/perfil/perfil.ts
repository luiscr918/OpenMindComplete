import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {

  usuario: any = null;

  librosPrestados: any[] = [];

  librosFavoritos: any[] = [];

  constructor() {
}
}
