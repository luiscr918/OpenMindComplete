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
import { DetalleLibro } from './pages/detalle-libro/detalle-libro';

export const routes: Routes = [
  /* Usuario */
  { path: '', component: Home },
  { path: 'registro', component: Register },
  { path: 'login', component: Login },
  { path: 'perfil', component: Perfil },
  { path: 'catalogo', component: Catalogo },
  { path: 'nosotros', component: Nosotros },
  { path: 'contactos', component: Contactos },
  { path: 'lista-usuarios', component: ListaUsuarios },
  { path: 'editar-usuario/:id', component: UsuarioEdit },
  { path: 'detalle-libro/:id', component: DetalleLibro },
  /* Libros */
  { path: 'registro-libros', component: RegisterLibro },
  { path: 'editar-libro/:id', component: EditLibro },
  { path: 'prestamos', component: Prestamos },
  { path: '**', redirectTo: '' },
  
];
