import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
//import { UsuarioGuardService } from './guards/usuario-guard.service';
import {RegistroComponent} from'./pages/registro/registro.component'

/*const appRoutes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},

  {path: 'mensajes',
   component: MensajesComponent,
   canActivate: [UsuarioGuardService]
  },
  {path: '**', component: LoginComponent},

];
*/
@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
