import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';

import {
  faTrash,
  faCheckCircle,
  faUsers,
  faUserCheck
  
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService } from 'src/app/Servicios/storage.service';
import { interfacePublicacion, interfaceUsuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-postulacion-publicacion',
  templateUrl: './postulacion-publicacion.component.html',
  styleUrls: ['./postulacion-publicacion.component.scss'],
})
export class PostulacionPublicacionComponent implements OnInit {
  @ViewChild('closeBtnModalEliminar') closeBtnEliminar: ElementRef; 
  public arrayVacio=false;
  public postulacionesArray:Array<any>=[]
  public idPublicacion:String=''
  public idPostulacion:String=''
  public postulacionAsignada:boolean=false;
  public usuarioLogueado:interfaceUsuario;
  public publicacionSeleccionada:interfacePublicacion;

  actualizarEstado={
    estado:'asignado'
  }
  actualizarEstadoEliminado={
    estado:'pendiente'
  }
  facheck=faCheckCircle
  faTrash=faTrash
  faUsers=faUsers
  faUserCheck=faUserCheck
  constructor(
    private consumoApi: ConsumoApiService,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private chatService: ChatService,
    private storage: StorageService,


  ) {}

  ngOnInit(): void {
    this.usuarioLogueado=JSON.parse(this.storage.getStorage());

    this.idPublicacion= this.router.snapshot.paramMap.get("id") 
    this.consumoApi.get('publicaciones/'+this.idPublicacion).subscribe((res:any)=>{
    
      this.publicacionSeleccionada=res.DATA[0]
      if(res.STATUS==='SUCCESS'){
          if(res.DATA.estado!=='null'){
            this.consumoApi.get('postulacionesByPublicacion/'+this.idPublicacion).subscribe((res:any)=>{
              try {
                if(res.STATUS==='SUCCESS'){
                  
                  this.postulacionesArray=res.DATA
                  if(res.DATA.length===0){
                    this.arrayVacio=true;
        
                  }
                }
              } catch (error) {
                console.log(error)
              }
            })
          }
          else{
            this.postulacionAsignada=true
            this.arrayVacio=true;
          }
      }
      else{
        this.arrayVacio=true;
      }
    })

  }
  setId(value){
  this.idPostulacion=value
  }
  convertirFecha(value):string{
    moment.locale('es');   
   
    const date = moment(value);
    
    let dateInFormat = date.format('LLLL');
    
    return dateInFormat
  }
  eliminarPostulacion(){
    this.consumoApi.delete('postulaciones/'+this.idPostulacion).subscribe((res:any)=>{
      if(res.STATUS==='SUCCESS'){
        this.consumoApi.put('publicaciones/'+this.idPublicacion,this.actualizarEstadoEliminado).subscribe()

        this.showSuccess('La publicación se ha eliminado')
        this.closeModalEliminar()
        this.reloadPage()
      }
    })
  }
  modificarUsuarioNotificacion(value){
    var modificarLeido={
      notificacion_leido:true
    }
    this.consumoApi.put('users/'+value,modificarLeido).subscribe()
  }

  asignarPostulacion(id,idUsuario,idPubli){
    this.modificarUsuarioNotificacion(idUsuario);
    var notificacionesConsultaUsuario:any
    var dateobj = new Date(); 
    var notificacion={
      notificacion_leido:true,
      notificaciones:{
        descripcion:this.usuarioLogueado.nombres+' ha confirmado tu postulacion para la publicación que aplicaste. ',
        tipo:'postulacionAsignada',
        fecha:String(dateobj),
        id_usuario:idUsuario,
        id_publicacion:idPubli,
        leida:false
      }
    }
    var notificacionPostulacion=notificacion.notificaciones

    this.consumoApi.put('postulaciones/'+id,this.actualizarEstado).subscribe((res:any)=>{
      if(res.STATUS==='SUCCESS'){
        this.consumoApi.put('publicaciones/'+this.idPublicacion,this.actualizarEstado).subscribe()
        this.consumoApi.get('users/'+idUsuario).subscribe((res:any)=>{
          notificacionesConsultaUsuario=res.DATA.notificaciones
          notificacionesConsultaUsuario.push(notificacion.notificaciones)
          notificacion.notificaciones=notificacionesConsultaUsuario
          this.consumoApi.put('users/'+idUsuario,notificacion).subscribe(()=>{
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
        this.showSuccess('Tu publicación ha sido asignada')
        this.reloadPage()
      }
    })
  }
  closeModalEliminar(){
    this.closeBtnEliminar.nativeElement.click(); 
  }
  showSuccess(value) {
    this.toastr.success(value, 'Éxito', {
      
    });
  }
  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  }
}
