import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Perfil } from './pages/perfil/perfil';
import { Prestamos } from './pages/prestamos/prestamos';
import { Contactos } from './pages/contactos/contactos';
import { Nosotros } from './pages/nosotros/nosotros';
import { Catalogo } from './pages/catalogo/catalogo';
import { RegisterLibro } from './pages/register-libro/register-libro';
import { EditLibro } from './pages/edit-libro/edit-libro';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { ListaUsuarios } from './pages/lista-usuarios/lista-usuarios';
import { UsuarioEdit } from './pages/usuario-edit/usuario-edit';
import { RegisterPrestamo } from './pages/register-prestamo/register-prestamo';
import { DetalleLibro } from './pages/detalle-libro/detalle-libro';
import { Dashboard } from './admin/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';


export const routes: Routes = [
  // Públicas
  { path: '', component: Home },
  { path: 'registro', component: Register },
  { path: 'login', component: Login },
  { path: 'catalogo', component: Catalogo },
  { path: 'nosotros', component: Nosotros },
  { path: 'contactos', component: Contactos },
  { path: 'detalle-libro/:id', component: DetalleLibro },

  // Requieren login
  { path: 'perfil', component: Perfil, canActivate: [authGuard] },
  { path: 'mis-prestamos/:usuarioId', component: Prestamos, canActivate: [authGuard] },
  { path: 'register-prestamo/:id', component: RegisterPrestamo, canActivate: [authGuard] },

  // Solo admin
  { path: 'dashboard', component: Dashboard, canActivate: [adminGuard] },
  { path: 'registro-libros', component: RegisterLibro, canActivate: [adminGuard] },
  { path: 'editar-libro/:id', component: EditLibro, canActivate: [adminGuard] },
  { path: 'lista-usuarios', component: ListaUsuarios, canActivate: [adminGuard] },
  { path: 'editar-usuario/:id', component: UsuarioEdit, canActivate: [adminGuard] },

  // Comodín siempre al final
  { path: '**', redirectTo: '' },
];