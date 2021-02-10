import { Component, OnInit  } from '@angular/core';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import { StorageService } from 'src/app/Servicios/storage.service';
import { interfaceUsuario } from 'src/app/interfaces/interfaces';
import * as moment from 'moment';
import {
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  notificacionesArray:any[] = [];
  usuarioLogueado: interfaceUsuario;
  arrayVacio:boolean=false
  faBell=faBell
  elemento: HTMLElement;
  
  constructor(
    private consumoApi: ConsumoApiService,
    private chatService: ChatService,
    private storage: StorageService,
  ) { }

  ngOnInit(): void {
    this.elemento = document.getElementById('notificaciones');

    this.usuarioLogueado=JSON.parse(this.storage.getStorage());
    this.consumoApi.get('users/'+this.usuarioLogueado._id).subscribe((res:any)=>{
      try {
        this.notificacionesArray=res.DATA.notificaciones
        if(this.notificacionesArray.length===0){
          this.arrayVacio=true
        }
      } catch (error) {
        console.log(error)
        this.arrayVacio=true
      }
    })
    this.chatService
      .getNotificaciones()
      .subscribe((msg) => {
        this.notificacionesArray.push(msg);
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 50);
      });
  }
  
  convertirFecha(value):string{
    moment.locale('es');   
   
    const date = moment(value);
    
    let dateInFormat = date.format('LLLL');
    
    return dateInFormat
  }

}
