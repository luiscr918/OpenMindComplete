import { CommonModule } from '@angular/common';
import { Component, effect, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../../models/usuario.model';
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer],
  templateUrl: './perfil.html',
})
export class Perfil {

  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  private cdr = inject(ChangeDetectorRef);

  usuario: Usuario | null = null;
  campoEditando: keyof Usuario | null = null;

  guardando = false;
  mostrarToast = false;

  constructor() {
    effect(() => {
      const firebaseUser = this.authService.usuarioFirebase();
      if (!firebaseUser?.email) return;

      this.usuarioService.getByEmail(firebaseUser.email).subscribe({
        next: (u) => {
          this.usuario = u;
          this.cdr.detectChanges();
        }
      });
    });
  }

  get inicial(): string {
    return this.usuario?.nombreCompleto
      ? this.usuario.nombreCompleto.charAt(0).toUpperCase()
      : '';
  }

  editar(campo: keyof Usuario) {
    this.campoEditando = campo;
  }

  guardar() {
    if (!this.usuario?.id) return;

    this.guardando = true;

    this.usuarioService.update(this.usuario.id, this.usuario).subscribe({
      next: (actualizado) => {
        this.usuario = actualizado;
        this.campoEditando = null;
        this.guardando = false;
        this.mostrarToast = true;

        setTimeout(() => this.mostrarToast = false, 2500);

        this.cdr.detectChanges();
      }
    });
  }

  cancelar() {
    this.campoEditando = null;
  }
}