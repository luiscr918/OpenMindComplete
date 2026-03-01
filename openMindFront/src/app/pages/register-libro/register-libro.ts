import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../services/libro-service';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-register-libro',
  imports: [CommonModule, ReactiveFormsModule, Navbar, Footer],
  templateUrl: './register-libro.html',
  styleUrl: './register-libro.css',
})
export class RegisterLibro implements OnInit {
  libroForm: FormGroup;
  mensaje: string = '';
  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
  ) {
    // Definimos los campos según tu modelo Libro
    this.libroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      autor: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      portada: ['', [Validators.required]], // URL de la imagen
      paginas: [1, [Validators.required, Validators.min(1)]],
      stock: [1, [Validators.required, Validators.min(1)]],
      archivoPdf: ['', [Validators.required]] // URL del PDF
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.libroForm.valid) {
      // No enviamos vistas ni descargas porque el Back las inicializa en 0
      this.libroService.create(this.libroForm.value).subscribe({
        next: () => {
          this.mensaje = '¡Libro guardado con éxito en Bibliotech!';
          this.libroForm.reset({ paginas: 1 });
        },
        error: (err) => {
          this.mensaje = 'Error al conectar con el servidor.';
          console.error(err);
        }
      });
    }
  }
}
