import { Injectable } from '@angular/core';
import { interfaceUsuario } from '../interfaces/interfaces';
import { WebsocketsService } from './websockets.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketsService
  ) { }

  sendMessage(descripcion:string,id_usuario:string,fecha:string,idReceptor:string,idEmisor:string,idChat:string){

      const payload ={
        id_usuario:id_usuario,
        descripcion:descripcion,
        fecha:fecha,
        idReceptor:idReceptor,
        idEmisor:idEmisor,
        idChat:idChat
      }
      this.wsService.emit('mensaje', payload );
  }


  sendNotificacion(descripcion:string,tipo:string,fecha:string,id_usuario:string,leida:string){

    const payload ={
      descripcion:descripcion,
      tipo:tipo,
      fecha:fecha,
      id_usuario:id_usuario,
      leida:leida,
    }
    this.wsService.emit('notificacion', payload );
  }
  sendUsuario(usuario:interfaceUsuario){
    const payload={
      usuario:usuario
    }
    this.wsService.emit('actualizarUsuario', payload );
  }

  getUsuario(){
    return this.wsService.listen('usuario-nuevo');
   }

  getMessages(){
   return this.wsService.listen('mensaje-nuevo');
  }
  getNotificaciones(){
    return this.wsService.listen('notificacion-nuevo');
   }

  getMessagesPrivate() {
    return this.wsService.listen( 'mensaje-privado' );
  }

  getUsuariosActivos(){
    return this.wsService.listen('usuarios-activos');
   }

  emitirUsuariosActivos(){


    this.wsService.emit('obtener-usuarios');
}

}
