import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Rol } from '../../../models/usuario.model';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-usuario-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './usuario-edit.html',
  styleUrl: './usuario-edit.css',
})
export class UsuarioEdit implements OnInit {
  editForm: FormGroup;
  mensaje = signal('');
  cargando = signal(false);
  usuarioId!: number;
  
  // Lista de roles para el select
  roles: Rol[] = ['ADMIN', 'AUTOR', 'LECTOR'];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      email: [{ value: '', disabled: true }], // Campo deshabilitado
      nombreCompleto: ['', [Validators.required]],
      ocupacion: [''],
      edad: [0, [Validators.required, Validators.min(0)]],
      intereses: [''],
      rol: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.usuarioId) {
      this.usuarioService.getById(this.usuarioId).subscribe({
        next: (usuario) => {
          this.editForm.patchValue(usuario);
        },
        error: () => this.mensaje.set('Error al cargar el usuario')
      });
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.cargando.set(true);
      // Usamos getRawValue() para incluir el campo 'email' que está disabled
      const datosActualizados = this.editForm.getRawValue();

      this.usuarioService.update(this.usuarioId, datosActualizados).subscribe({
        next: () => {
          this.mensaje.set('¡Usuario actualizado con éxito!');
          setTimeout(() => this.router.navigate(['/usuarios']), 1500);
        },
        error: (err) => {
          this.cargando.set(false);
          this.mensaje.set('Error al actualizar: ' + err.message);
        }
      });
    }
  }
}
