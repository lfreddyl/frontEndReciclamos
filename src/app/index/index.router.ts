import { Route } from '@angular/router';

import { IndexComponent } from './index.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegistroComponent } from '../pages/registro/registro.component';
import { IndexGuard } from '../guard/index.guard';
export const IndexRoutes: Route[] = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [IndexGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registro',
        component: RegistroComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
    
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
