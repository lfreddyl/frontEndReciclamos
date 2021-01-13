import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import { StorageService } from '../../Servicios/storage.service';
import { Subscription } from 'rxjs';
import {
  interfaceMensaje,
  interfaceUsuario,
} from 'src/app/interfaces/interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input()
  idChat: string;
  @Input()
  idReceptor: string;
  @Input()
  idEmisor: string;

  texto = '';
  mensajesSubscription: Subscription;
  public usuarioLogueado: interfaceUsuario;
  notificacionesSubscription: Subscription;
  notificaciones: any[] = [];
  elemento: HTMLElement;
  inputSms: HTMLInputElement;
  mensajes: any[] = [];
  idUsuarioMensajeLeido:string='';
  sms: interfaceMensaje = {
    id_chat: '',
    descripcion: '',
    fecha: '',
    id_usuario: '',
  };
  constructor(
    private chatService: ChatService,
    private consumoApi: ConsumoApiService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    
    this.usuarioLogueado = JSON.parse(this.storage.getStorage());
    this.consumoApi
    .get('users/' + this.usuarioLogueado._id)
    .subscribe((res: any) => {
      try {
        if (res.STATUS === 'SUCCESS') {
          this.usuarioLogueado = res.DATA;
          
        }
      } catch (error) {
        console.log(error);
      }
    });
    this.elemento = document.getElementById('chat-mensajes');
    this.consumoApi
      .get('mensajesByChat/' + this.idChat)
      .subscribe((res: any) => {
        this.mensajes = res.DATA;
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      });

    this.mensajesSubscription = this.chatService
      .getMessages()
      .subscribe((msg) => {
        this.mensajes.push(msg);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      });

    this.notificacionesSubscription = this.chatService
      .getMessagesPrivate()
      .subscribe((msg) => {
        this.notificaciones.push(msg);
      });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  modificarEstadoUsuario(){
    this.chatService.sendUsuario(this.usuarioLogueado)
    
  }
  guardarMensaje() {
    const date = new Date();
    this.sms.fecha = date.toISOString();
    (this.sms.id_usuario = this.usuarioLogueado._id),
    (this.sms.id_chat = this.idChat);
    this.chatService.sendUsuario(this.usuarioLogueado)
    this.consumoApi.post('mensajes/', this.sms).subscribe((res: any) => {
      var params = {
        leido: false,
      };
      this.consumoApi
        .put('chats/' + this.sms.id_chat, params)
        .subscribe(() => {
          this.modificarMensajeLeidoUser();
        });
       
      this.chatService.sendMessage(
        String(this.sms.descripcion),
        String(this.sms.id_usuario),
        String(this.sms.fecha),
        this.idReceptor,
        this.idEmisor,
        String(this.sms.id_chat)
      );
      this.sms.descripcion = '';
    });
  }
  modificarMensajeLeidoUser(){
    this.consumoApi.get('chats/'+this.idChat).subscribe((res:any)=>{
      
      if(res.DATA.id_emisor===this.usuarioLogueado._id){
          this.modificarUsuario(res.DATA.id_receptor);
      }
      else{
      if(res.DATA.id_receptor===this.usuarioLogueado._id){
         this.modificarUsuario(res.DATA.id_emisor);

        }
      }
    })
  }
  modificarUsuario(value){
    var modificarLeido={
      mensaje_leido:true
    }
    this.consumoApi.put('users/'+value,modificarLeido).subscribe()
  }
  convertirFecha(value): string {
    moment.locale('es');

    const date = moment(value);

    let dateInFormat = date.calendar();

    return dateInFormat;
  }
}
