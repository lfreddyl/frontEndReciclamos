import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  interfacePublicacion,
  interfaceResiduo,
  interfaceUsuario,
} from 'src/app/interfaces/interfaces';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import { StorageService } from '../../Servicios/storage.service';
import {
  faTrash,
  faEdit,
  faClipboardList,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-publicaciones',
  templateUrl: './mis-publicaciones.component.html',
  styleUrls: ['./mis-publicaciones.component.scss'],
})
export class MisPublicacionesComponent implements OnInit {
  @ViewChild('closeBtnModal') closeBtn: ElementRef;
  @ViewChild('closeBtnModalEliminar') closeBtnEliminar: ElementRef;

  public arrayVacio = false;
  public descripcionDelete: any = '';
  public usuarioLogueado: interfaceUsuario;
  public publicacionesArray: Array<interfacePublicacion> = [];
  public arrayResiduos: Array<interfaceResiduo> = [];
  public idPublicacionSeleccionada: String = '';
  public archivo = new FormData();
  public nombreImagenModificada:string='';

  public publicacion: interfacePublicacion = {
    id_usuario: '',
    descripcion: '',
    img: '',
    tipo: '',
    cantidad: 0,
    direccion: '',
    fecha: '',
    estado: '',
    residuos: [],
  };
  public isErrorCantidad = false;
  public isError = false;
  public isErrorLogin = false;
  faTrash = faTrash;
  faEdit = faEdit;
  faClipBoard = faClipboardList;
  faUsers = faUsers;
  constructor(
    private consumoApi: ConsumoApiService,
    private storage: StorageService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.consumoApi.get('residuos').subscribe((res: any) => {
      try {
        this.arrayResiduos = res.DATA;
        if (res.DATA.length === 0) {
          this.arrayVacio = true;
        }
      } catch (error) {
        console.log(error);
      }
    });
    this.usuarioLogueado = JSON.parse(this.storage.getStorage());
    this.consumoApi
      .get('publicacionesByUser/' + this.usuarioLogueado._id)
      .subscribe((res: any) => {
        this.publicacionesArray = res.DATA;
        if (res.DATA.length === 0) {
          this.arrayVacio = true;
        }
      });
  }
  asignarArchivo(files: FileList) {
    this.nombreImagenModificada=files[0].name
    this.archivo.append('picture', files[0]);
    console.log(this.nombreImagenModificada)
    
  }
  eliminarPublicacion() {
    this.consumoApi
      .delete('publicaciones/' + this.idPublicacionSeleccionada)
      .subscribe((res: any) => {
        console.log(res);
        if (res.STATUS === 'SUCCESS') {
          this.closeModalEliminar();
          this.showSuccess();
          this.reloadPage();
        }
      });
  }
  convertirFecha(value): string {
    moment.locale('es');

    const date = moment(value);

    let dateInFormat = date.format('LLLL');

    return dateInFormat;
  }
  navegarPostulacion(value: any) {
    this.router.navigate(['/welcome/postulacionesPublicacion', value]);
  }
  compareFn(c1: interfaceResiduo, c2: interfaceResiduo): boolean {
    return c1 && c2 ? c1.descripcion === c2.descripcion : c1 === c2;
  }
  setValoreEliminacion(descripcion: any, id: any) {
    this.descripcionDelete = descripcion;
    this.idPublicacionSeleccionada = id;
    console.log(this.idPublicacionSeleccionada);
  }
  setPublicacion(item: interfacePublicacion) {
    this.publicacion._id=item._id;
    this.publicacion.cantidad=item.cantidad;
    this.publicacion.descripcion=item.descripcion;
    this.publicacion.direccion=item.direccion;
    this.publicacion.residuos=item.residuos
  }
  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
  guardarPublicacion(form: NgForm) {
    var apistorage = environment.urlStorage + 'imgpublicaciones/';
    if (this.publicacion.cantidad < 1 || this.publicacion.cantidad > 10000) {
      this.onisErrorCantidad();
    }

    if (form.valid) {
      var dateobj = new Date();
      this.publicacion.fecha = String(dateobj);
      if(this.nombreImagenModificada!==''){
        this.consumoApi
        .subirImagen('uploadpublicaciones/', this.archivo)
        .subscribe((res: any) => {
          if (res.STATUS === 'SUCCESS') {
            this.publicacion.img = String(apistorage + res.DATA);
            this.consumoApi
              .put('publicaciones/' + this.publicacion._id, this.publicacion)
              .subscribe((res: any) => {
                console.log(res);
                if (res.STATUS === 'SUCCESS') {
                  this.resetForm(form);
                  this.closeModal();
                  this.showSuccess();
                 this.reloadPage();
                }
              });
          }
        });
      }
      else{
        this.consumoApi
              .put('publicaciones/' + this.publicacion._id, this.publicacion)
              .subscribe((res: any) => {
                console.log(res);
                if (res.STATUS === 'SUCCESS') {
                  this.resetForm(form);
                  this.closeModal();
                  this.showSuccess();
                 this.reloadPage();
                }
              });
      }
   
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
  closeModalEliminar() {
    this.closeBtnEliminar.nativeElement.click();
  }
  showSuccess() {
    this.toastr.success('Tu publicación se ha actualizado', 'Éxito', {});
  }
  showError() {
    this.toastr.warning('Hubo un error al procesar la solicitud', 'Error', {});
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
