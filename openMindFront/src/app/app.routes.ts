import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Perfil } from './pages/perfil/perfil';
import { Prestamos } from './pages/prestamos/prestamos';
import { Contactos } from './pages/contactos/contactos';
import { Nosotros } from './pages/nosotros/nosotros';
import { Catalogo } from './pages/catalogo/catalogo';



export const routes: Routes = [
    { path: '', component:Home },
    { path: 'perfil', component: Perfil },
    { path: 'catalogo', component: Catalogo },
    { path: 'prestamos', component: Prestamos },
    { path: 'nosotros', component: Nosotros },
    { path: 'contactos', component: Contactos },
    { path: '**', redirectTo: '' }
];
