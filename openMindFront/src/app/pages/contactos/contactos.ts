import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-contactos',
  imports: [CommonModule, FormsModule, Footer, Navbar],
  templateUrl: './contactos.html',
  styleUrl: './contactos.css',
})
export class Contactos {

  contacto = {
    nombre: '',
    correo: '',
    mensaje: ''
  };

  enviarFormulario() {
    console.log('Formulario enviado', this.contacto);

    alert('¡Gracias por contactarnos! Te responderemos pronto.');

    this.contacto = { nombre: '', correo: '', mensaje: '' };
  }

}
