import { Component, OnInit } from '@angular/core';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import { StorageService } from 'src/app/Servicios/storage.service';
import * as moment from 'moment';
import { interfaceChat, interfaceUsuario } from 'src/app/interfaces/interfaces';
import {
  faSms
} from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  public newMessage:boolean=false;
  public idChatNewMessage:String='';
  public idUsuarioNewMessage:String='';

  mensajesSubscription: Subscription;
  public chatsArray: Array<interfaceChat> = [];
  public usuarioLogueado:interfaceUsuario;
  public arrayVacio:boolean=false;
  faSms=faSms
  constructor(
    private consumoApi: ConsumoApiService,
    private storage: StorageService,
    private chatService: ChatService

  ) { }

  ngOnInit(): void {
    this.usuarioLogueado=JSON.parse(this.storage.getStorage());
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
    this.consumoApi.get('chatsByUser/'+this.usuarioLogueado._id).subscribe((res: any) => {
      try {
        this.chatsArray = res.DATA;
        
        if(res.DATA.length===0){
          this.arrayVacio=true
        }
        
      } catch (error) {
        console.log(error);
      }
    });
    this.mensajesSubscription = this.chatService
    .getMessages()
    .subscribe((msg:any) => {
      if (msg.id_usuario!==this.usuarioLogueado._id) {
        this.newMessage=true;
        this.idChatNewMessage=msg.idChat
        this.idUsuarioNewMessage=msg.id_usuario
      }
    });
  }
  leerChat(idCHAT:string,leido:boolean){
    var params={
      leido:true
    }
    if(!leido){
      this.consumoApi.put('chats/'+idCHAT,params).subscribe((res:any)=>{
        this.modificarUsuario(this.usuarioLogueado._id)
        this.usuarioLogueado.mensaje_leido=false
        this.chatService.sendUsuario(this.usuarioLogueado)
      })
    }
    

  }

  modificarUsuario(value){
    var modificarLeido={
      mensaje_leido:false
    }
    this.consumoApi.put('users/'+value,modificarLeido).subscribe()
  }

  DesactivarMessage(){
    this.newMessage=false;
  }
  convertirFecha(value):string{
    moment.locale('es');   
   
    const date = moment(value);
    
    let dateInFormat = date.format('LLLL');
    
    return dateInFormat
  }

}
