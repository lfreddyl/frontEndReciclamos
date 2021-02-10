import { Component, OnInit } from '@angular/core';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import { interfacePublicacion, interfaceUsuario } from '../../interfaces/interfaces';
import { ChatService } from '../../services/chat.service';

import {
  faTrash,
  faEdit,
  faClipboardList,
  faUsers,
  faSms,
  faMapMarkerAlt,
  faCalculator
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/Servicios/storage.service';
import * as moment from 'moment';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;
  faClipBoard = faClipboardList;
  faUsers = faUsers;
  faSms = faSms;
  faMapMarkerAlt=faMapMarkerAlt
  faCalculator=faCalculator

  public usuarioLogueado:interfaceUsuario;
  public publicacionesArray: Array<interfacePublicacion> = [];
  public idUsuarioPublicacion:string='';
  constructor(
    private consumoApi: ConsumoApiService,
    private toastr: ToastrService,
    private storage: StorageService,
    private chatService: ChatService,

  ) {}

  ngOnInit(): void {
   
    this.consumoApi.get('publicacioness/'+1).subscribe((res: any) => {
      try {
        this.publicacionesArray = res.DATA;
      } catch (error) {
        console.log(error);
      }
    });
    this.usuarioLogueado=JSON.parse(this.storage.getStorage());

  }
  setIdReceptor(value){
    this.idUsuarioPublicacion=value
  }
  postular(descripcionPu,idUsuario, idPost,idUserPublicacion) {
    var notificacionesConsultaUsuario:any
    var dateobj = new Date(); 
    var notificacion={
      notificacion_leido:true,
      notificaciones:{
        descripcion:this.usuarioLogueado.nombres+' ha postulado a tu publicación '+descripcionPu,
        tipo:'postulacion',
        fecha:String(dateobj),
        id_usuario:idUserPublicacion,
        id_publicacion:idPost,
        leida:false
      }
    }
    var notificacionPostulacion=notificacion.notificaciones
    
    const postulacion={
      id_usuario:idUsuario,
      id_publicacion:idPost,
      estado:"pendiente",
      fecha:String(dateobj)
    }
    this.consumoApi
      .get('postulacionesByUserByPost/' + idUsuario + '/' + idPost)
      .subscribe((res: any) => {
        if (res.DATA === null&&res.STATUS==='SUCCESS') {
          try {
            this.consumoApi.post('postulaciones',postulacion).subscribe((res:any)=>{
            if(res.STATUS==='SUCCESS'){
              this.showSuccess('Tu postulación se ha registrado')
              this.consumoApi.get('users/'+idUserPublicacion).subscribe((res:any)=>{
                  notificacionesConsultaUsuario=res.DATA.notificaciones
                  notificacionesConsultaUsuario.push(notificacion.notificaciones)
                  notificacion.notificaciones=notificacionesConsultaUsuario
                  this.consumoApi.put('users/'+idUserPublicacion,notificacion).subscribe(()=>{
                    this.chatService.sendNotificacion(
                      String(notificacionPostulacion.descripcion),
                      String(notificacionPostulacion.tipo),
                      String(notificacionPostulacion.fecha),
                      String(notificacionPostulacion.id_usuario),
                      String(notificacionPostulacion.leida)
                    );
                  }
                  )
                  
              });

            }
            else{
            this.showError('Hubo un problema inténtalo mas tarde')
            }
            })
          } catch (error) {
            this.showError('Hubo un problema inténtalo mas tarde')
          }

        
        } else {
          this.showInfo('Usted ya ha postulado a esta publicación')
        }
      });
  }
  showSuccess(value) {
    this.toastr.success(value, 'Éxito', {
      
    });
  }
  showInfo(value) {
    this.toastr.warning(value, 'Error', {
    });
  }
  showError(value){
    this.toastr.warning(value, 'Error', {
    });
  }
  convertirFecha(value):string{
    moment.locale('es');   
   
    const date = moment(value);
    
    let dateInFormat = date.format('LLLL');
    
    return dateInFormat
  }
}
