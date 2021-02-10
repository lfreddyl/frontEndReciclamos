import { Route } from '@angular/router';

import { IndexComponent } from './index.component';
import { LoginComponent } from '../pages/login/login.component';
import { PresentationComponent } from '../pages/presentation/presentation.component';
import { RegistroComponent } from '../pages/registro/registro.component';
import { IndexGuard } from '../guard/index.guard';
export const IndexRoutes: Route[] = [
  {
    path: '',
    component: IndexComponent,
    canActivate: [IndexGuard],
    children: [
      {
        path: 'about',
        component: PresentationComponent,
      },
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
        redirectTo: 'about',
        pathMatch: 'full',
      },
    ],
    
  },
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  }
];
