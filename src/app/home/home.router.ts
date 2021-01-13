import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeGuard } from '../guard/home.guard';
import { PlantillaIntegradaComponent } from '../Plantilla/plantilla-integrada/plantilla-integrada.component';
import {MisPostulacionesComponent} from '../pages/mis-postulaciones/mis-postulaciones.component';
import {MisPublicacionesComponent} from '../pages/mis-publicaciones/mis-publicaciones.component';
import {MisReciclajesComponent} from '../pages/mis-reciclajes/mis-reciclajes.component';
import {PerfilEcologicoComponent} from '../pages/perfil-ecologico/perfil-ecologico.component';
import {InicioComponent} from '../pages/inicio/inicio.component';
import {PostulacionPublicacionComponent} from '../pages/postulacion-publicacion/postulacion-publicacion.component';
import {PublicacionComponent} from '../pages/publicacion/publicacion.component';
import {ChatsComponent} from '../pages/chats/chats.component';
import {MensajesComponent} from '../pages/mensajes/mensajes.component';
import {ConfiguracionComponent} from '../pages/configuracion/configuracion.component';
import {BusquedaComponent} from '../pages/busqueda/busqueda.component'
import {NotificacionesComponent} from '../pages/notificaciones/notificaciones.component'



export const HomeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [HomeGuard],
    children: [
      {
        path: 'welcome',
        component: PlantillaIntegradaComponent,
        children: [
          {
            path: 'misPublicaciones',
            component: MisPublicacionesComponent,
          },
          {
            path: 'misPostulaciones',
            component: MisPostulacionesComponent,
          },
          {
            path: 'perfilEcologico/:idUsuario',
            component: PerfilEcologicoComponent,
          },
          {
            path: 'misRecolecciones',
            component: MisReciclajesComponent,
          },
          {
            path: 'inicio',
            component: InicioComponent,
          },
          {
            path: 'postulacionesPublicacion/:id',
            component: PostulacionPublicacionComponent,
            pathMatch: 'full',
          },
          {
            path: 'publicacion/:id',
            component: PublicacionComponent,
            pathMatch: 'full',
          },
          {
            path: 'chats',
            component: ChatsComponent,
            pathMatch: 'full',
          },
          {
            path: 'mensajes/:idChat',
            component: MensajesComponent,
            pathMatch: 'full',
          },
          {
            path: 'configuracion',
            component: ConfiguracionComponent,
            pathMatch: 'full',
          },
          {
            path: 'busqueda/:valor',
            component: BusquedaComponent,
            pathMatch: 'full',
          },
          {
            path: 'notificaciones',
            component: NotificacionesComponent,
            pathMatch: 'full',
          },
          {
            path: '',
            redirectTo: 'inicio',
             pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: '/welcome/inicio/',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];
