import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { UsuarioService } from '../services/usuario-service';
import { map, catchError, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const user = authService.usuarioFirebase();

  if (!user?.email) {
    router.navigate(['/login']);
    return false;
  }

  return usuarioService.getByEmail(user.email).pipe(
    map((u) => {
      if (u.rol === 'ADMIN') return true;
      router.navigate(['/']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};