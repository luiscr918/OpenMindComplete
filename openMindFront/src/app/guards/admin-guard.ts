import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { UsuarioService } from '../services/usuario-service';
import { map, catchError, of, filter, switchMap, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  // Esperar a que Firebase termine de cargar (que deje de ser undefined)
  return toObservable(authService.usuarioFirebase).pipe(
    filter(user => user !== undefined), // esperar hasta que no sea undefined
    take(1),                             // tomar solo el primer valor real
    switchMap(user => {
      if (!user?.email) {
        router.navigate(['/login']);
        return of(false);
      }

      return usuarioService.getByEmail(user.email).pipe(
        map(u => {
          if (u.rol === 'ADMIN') return true;
          router.navigate(['/']);
          return false;
        }),
        catchError(() => {
          router.navigate(['/']);
          return of(false);
        })
      );
    })
  );
};