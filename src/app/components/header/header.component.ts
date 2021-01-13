import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  faSearch,
  faBell,
  faSms,
  faNewspaper,
  faPlus,
  faUserCog,
  faSignOutAlt,
  faRecycle
} from '@fortawesome/free-solid-svg-icons';
import { StorageService } from '../../Servicios/storage.service';
import {
  interfaceUsuario,
  interfacePublicacion,
  interfaceResiduo,
  interfaceArchivo,
} from '../../interfaces/interfaces';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public urlStorage: string = '';
  public archivo = new FormData();
  public imgPublicacion: string = '';
  public bandera: boolean = false;
  public valorBusqueda: string = '';
  public newMessage:boolean=false;
  public newNotificacion:boolean=false;
  @ViewChild('closeBtnModal') closeBtn: ElementRef;
  public usuarioLogueado: interfaceUsuario;
  public arrayResiduos: Array<interfaceResiduo> = [];
  mensajesSubscription: Subscription;
  public mensajePendienteUsuario:boolean=false;
  public notificacionPendienteUsuario:boolean=false;


  public publicacion: interfacePublicacion = {
    id_usuario: '',
    descripcion: '',
    img: '',
    tipo: '',
    cantidad: 0,
    direccion: '',
    fecha: null,
    estado: '',
    residuos: [],
  };
  public isErrorCantidad = false;
  public isError = false;
  public isErrorLogin = false;

  faSearch = faSearch;
  faBell = faBell;
  faSms = faSms;
  faNewspaper = faNewspaper;
  faPlus = faPlus;
  faUserCog = faUserCog;
  faSignOutAlt = faSignOutAlt;
  faRecycle=faRecycle
  constructor(
    private storage: StorageService,
    private consumoApi: ConsumoApiService,
    private toastr: ToastrService,
    private router: Router,
    private chatService: ChatService
  ) {
    
  }

  ngOnInit(): void {
    this.usuarioLogueado = JSON.parse(this.storage.getStorage());
    this.consumoApi
      .get('users/' + this.usuarioLogueado._id)
      .subscribe((res: any) => {
        try {
          if (res.STATUS === 'SUCCESS') {
            this.usuarioLogueado = res.DATA;
            this.mensajePendienteUsuario=res.DATA.mensaje_leido
            this.notificacionPendienteUsuario=res.DATA.notificacion_leido
          }
        } catch (error) {
          console.log(error);
        }
      });
    
    this.chatService.getUsuario().subscribe((usuario:interfaceUsuario)=>{
      this.mensajePendienteUsuario=false
    })  
    this.publicacion.id_usuario = this.usuarioLogueado._id;
    this.consumoApi.get('residuos').subscribe((res: any) => {
      try {
        this.arrayResiduos = res.DATA;
      } catch (error) {
        console.log(error);
      }
    });
    this.mensajesSubscription = this.chatService
      .getMessages()
      .subscribe((msg:any) => {
        if (msg.id_usuario!==this.usuarioLogueado._id) {
          this.newMessage=true
        }
        
      });
      this.chatService
      .getNotificaciones()
      .subscribe((msg:any) => {
        
          this.newNotificacion=true
        
        
      });
  }
  modificarNotificacionUsuario(){
    this.notificacionPendienteUsuario=false;
    this.modificarUsuarioNotificacion(this.usuarioLogueado._id)
    console.log("presionado")
  }
  modificarMensajeUsuario(){
    this.mensajePendienteUsuario=false;
    this.modificarUsuario(this.usuarioLogueado._id);
  }
  modificarUsuario(value){
    var modificarLeido={
      mensaje_leido:false
    }
    this.consumoApi.put('users/'+value,modificarLeido).subscribe()
  }
  modificarUsuarioNotificacion(value){
    var modificarLeido={
      notificacion_leido:false
    }
    this.consumoApi.put('users/'+value,modificarLeido).subscribe()
  }
  DesactivarMessage(){
    this.newMessage=false;
  }
  navegarBusqueda() {
    if(this.valorBusqueda!==''){
      this.router
      .navigateByUrl('/welcome/inicio', { skipLocationChange: true })
      .then(() =>
        this.router.navigate(['/welcome/busqueda/' + this.valorBusqueda])
      );
    }
  }

  cerrarSesion() {
    this.storage.removeStorage();
    window.location.reload();

  }
  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  asignarArchivo(files: FileList) {
    this.archivo.append('picture', files[0]);
  }
  guardarPublicacion(form: NgForm) {
    if (this.publicacion.cantidad < 1 || this.publicacion.cantidad > 10000) {
      this.onisErrorCantidad();
    }
    if (form.valid) {
      var apistorage = environment.urlStorage + 'imgpublicaciones/';
      var dateobj = new Date();
      var date = dateobj.toISOString();
      this.publicacion.estado = 'pendiente';
      this.publicacion.fecha = date;
      this.consumoApi
        .subirImagen('uploadpublicaciones/', this.archivo)
        .subscribe((res: any) => {

          if (res.STATUS === 'SUCCESS') {
            this.publicacion.img = String(apistorage + res.DATA);
            this.consumoApi
              .post('publicaciones', this.publicacion)
              .subscribe((res: any) => {
                if (res.STATUS === 'SUCCESS') {
                  console.log(res);
                  this.showSuccess();
                  this.closeModal();
                  form.reset();
                  this.reloadPage();
                }
              });
          }
        });
    } else {
      this.onisError();
    }
  }
  resetForm(form: NgForm) {
    form.reset();
  }
  closeModal() {
    this.closeBtn.nativeElement.click();
  }
  showSuccess() {
    this.toastr.success('Tu publicación se ha registrado', 'Éxito', {});
  }
  onisError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
  onisErrorLogin(): void {
    this.isErrorLogin = true;
    setTimeout(() => {
      this.isErrorLogin = false;
    }, 4000);
  }
  onisErrorCantidad(): void {
    this.isErrorCantidad = true;
    setTimeout(() => {
      this.isErrorCantidad = false;
    }, 4000);
  }
}
