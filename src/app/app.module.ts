import { IndexModule } from './index/index.module';
import { HomeModule } from './home/home.module';
import { Routes, RouterModule, Router } from '@angular/router';

import { HomeRoutes } from './home/home.router';
import { IndexRoutes } from './index/index.router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import {FormsModule} from '@angular/forms';
import { ListaComponent } from './components/lista/lista.component';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './home/home.component';
import {IndexComponent} from './index/index.component' ;
import { PlantillaIntegradaComponent } from './Plantilla/plantilla-integrada/plantilla-integrada.component';
import { HeaderComponent } from './components/header/header.component';
import { AsideComponent } from './components/aside/aside.component';
import { ContentComponent } from './components/content/content.component';
import {StorageService} from './Servicios/storage.service'
import {ConsumoApiService} from './Servicios/consumo-api.service'
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { MisPublicacionesComponent } from './pages/mis-publicaciones/mis-publicaciones.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisReciclajesComponent } from './pages/mis-reciclajes/mis-reciclajes.component';
import { MisPostulacionesComponent } from './pages/mis-postulaciones/mis-postulaciones.component';
import { PerfilEcologicoComponent } from './pages/perfil-ecologico/perfil-ecologico.component';
import { SectionComponent } from './components/section/section.component';
import { PostulacionPublicacionComponent } from './pages/postulacion-publicacion/postulacion-publicacion.component';
import { PublicacionComponent } from './pages/publicacion/publicacion.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { SmsComponent } from './components/sms/sms.component';

import { ChartsModule } from 'ng2-charts';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
const config: SocketIoConfig = {
  url: environment.wsUrl , options: {} };

const appRoutes:Routes=[...IndexRoutes,...HomeRoutes]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    ListaComponent,
    LoginComponent,
    MensajesComponent,
    RegistroComponent,
    PlantillaIntegradaComponent,
    HeaderComponent,
    AsideComponent,
    ContentComponent,
    HomeComponent,
    IndexComponent,
    MisPublicacionesComponent,
    InicioComponent,
    MisReciclajesComponent,
    MisPostulacionesComponent,
    PerfilEcologicoComponent,
    SectionComponent,
    PostulacionPublicacionComponent,
    PublicacionComponent,
    ChatsComponent,
    SmsComponent,
    ConfiguracionComponent,
    BusquedaComponent,
    NotificacionesComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    IndexModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(config),
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ChartsModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right', preventDuplicates: true,timeOut: 3000}), 
    
  ],
  providers: [ConsumoApiService,StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
