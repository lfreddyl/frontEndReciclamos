import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {
  public socketStatus = false;

  public usuario: Usuario = null;



  constructor(
    private socket: Socket,
    private router: Router
  ) {
   // this.cargarStorage();

   // this.checkStatus();
   }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('conectado');
      this.socketStatus = true;
      this.cargarStorage();
    });
    this.socket.on('disconnect', () => {
      console.log('desconectado');
      this.socketStatus = false;
    });
  }

  getUsuario(){
    return this.usuario;
  }

  emit(evento: string, payload?: any, callback?: Function){

    this.socket.emit(evento, payload, callback);

  }

  listen(evento: string){
    return this.socket.fromEvent(evento);

  }
  loginWS(identificadorBD: string){
   

      this.emit('configurar-usuario', { identificadorBD },()=>{});

    
  }
  logutWS(){
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    };
    this.emit('configurar-usuario', payload, () =>{});
    this.router.navigateByUrl('');
  }

  guardarStorage(){
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }
  cargarStorage() {

    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.loginWS( this.usuario.nombre );
    }
  }

}
