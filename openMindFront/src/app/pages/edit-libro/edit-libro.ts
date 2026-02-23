import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from '../../../models/libro.model';

@Component({
  selector: 'app-edit-libro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-libro.html',
  styleUrl: './edit-libro.css',
})
export class EditLibro {
  libroForm: FormGroup;
  mensaje: string = '';
  libroId!: number;
  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private route: ActivatedRoute, // Para leer el ID de la URL
    private router: Router, // Para redirigir tras guardar
  ) {
    this.libroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      autor: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      portada: ['', [Validators.required]],
      paginas: [1, [Validators.required, Validators.min(1)]],
      archivoPdf: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Obtenemos el ID de la URL
    this.libroId = Number(this.route.snapshot.paramMap.get('id'));

    // Cargamos los datos actuales del libro
    if (this.libroId) {
      this.libroService.getById(this.libroId).subscribe({
        next: (libro: Libro) => {
          // Rellenamos el formulario con los datos recibidos
          this.libroForm.patchValue(libro);
        },
        error: () => (this.mensaje = 'No se pudo cargar el libro.'),
      });
    }
  }

  onSubmit(): void {
    if (this.libroForm.valid) {
      this.libroService.update(this.libroId, this.libroForm.value).subscribe({
        next: () => {
          this.mensaje = '¡Libro actualizado con éxito!';
          // Opcional: Redirigir al catálogo tras 2 segundos
          setTimeout(() => this.router.navigate(['/catalogo']), 2000);
        },
        error: (err) => {
          this.mensaje = 'Error al actualizar el libro.';
          console.error(err);
        },
      });
    }
  }
}
