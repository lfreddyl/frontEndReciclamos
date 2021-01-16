import { Component, OnInit } from '@angular/core';
import { interfaceUsuario } from 'src/app/interfaces/interfaces';
import {ConsumoApiService} from '../../Servicios/consumo-api.service'
import {StorageService} from '../../Servicios/storage.service'
import { ToastrService } from 'ngx-toastr';

import {
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  public usuarioLogueado:interfaceUsuario={
    img:'',
    nombres:'',
    apellidos:'',
    correo:'',
    password:'',
    telefono:''
  };

  faEdit=faEdit
  public isError = false;
  public isErrorContrasena = false;
  public isErrorContrasenaNueva = false;
  public contrasenaActualError=false
  public contrasenaNuevaError=false
  public contrasenaUno:string=''
  public contrasenaDos:string=''
  public password:string=''
  public  archivo=new FormData();
  public nombreImagenPerfil={
    img:''
  }



  constructor(
    private consumoApi:ConsumoApiService,
    private storage:StorageService,
    private toastr: ToastrService,

    ) { 
    this.usuarioLogueado=JSON.parse(this.storage.getStorage());
    consumoApi.get('users/'+this.usuarioLogueado._id).subscribe((res:any)=>{
      this.usuarioLogueado=res.DATA
    })
  }

  ngOnInit(): void {

  }
  asignarArchivo(files: FileList){
    var apistorage=environment.urlStorage+'imgpublicaciones/';

    this.archivo.append('picture',files[0]);
    this.consumoApi.subirImagen('uploadpublicaciones/',this.archivo).subscribe((res:any)=>{
      console.log(res)

      if(res.STATUS==='SUCCESS'){
        this.nombreImagenPerfil.img=String(apistorage+res.DATA)
        this.consumoApi.put('users/'+this.usuarioLogueado._id,this.nombreImagenPerfil).subscribe((res:any)=>{
          if(res.STATUS==='SUCCESS'){
            console.log(res)
            this.showSuccess('La imagen se ha actualizado correctamente')
            //this.reloadPage()
          }
       })
      }
 
    })
  }
  editarUsuario(form:NgForm){
    if (form.valid) {
      this.consumoApi.put('users/'+this.usuarioLogueado._id,this.usuarioLogueado).subscribe((res:any)=>{
        try {
          if(res.STATUS==='SUCCESS'){
            this.showSuccess('Tus datos se han Actualizado')
            this.reloadPage()
          }
          else{
            this.showError()
          }
        } catch (error) {
          console.log(error)
        }
      })
      
    }
    else{
      this.onisError()
    }

  }
  cambiarPassword(form:NgForm){
    this.compararContrasena()
    this.compararContrasenaNueva()
    if(!this.contrasenaActualError&&!this.contrasenaNuevaError){
      const passwordNew={
        password:this.contrasenaDos
      }
      if(form.valid){
        try {
          this.consumoApi.put('users/'+this.usuarioLogueado._id,passwordNew).subscribe((res:any)=>{
            if(res.STATUS==='SUCCESS'){
              this.showSuccess('Tus Contraseña se ha Actualizado')
              this.reloadPage()
            }
            else{
              this.showError()
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
      else{
        this.onisError()
      }

    }
    else{
      if (this.contrasenaActualError) {
        this.onisErrorContra()
      }
      if (this.contrasenaNuevaError) {
        this.onisErrorContraNueva()
      }
    }

  }
  compararContrasena(){
    if(this.usuarioLogueado.password!==this.password){
          this.contrasenaActualError=true
    }
    else{
      this.contrasenaActualError=false
    }

  }
  compararContrasenaNueva(){
    if(this.contrasenaUno!==this.contrasenaDos){
      this.contrasenaNuevaError=true
    }
    else{
    this.contrasenaNuevaError=false
    }
  }
  onisError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
  onisErrorContra(): void {
    this.isErrorContrasena = true;
    setTimeout(() => {
      this.isErrorContrasena = false;
    }, 4000);
  }

  onisErrorContraNueva(): void {
    this.isErrorContrasenaNueva = true;
    setTimeout(() => {
      this.isErrorContrasenaNueva = false;
    }, 4000);
  }
  reloadPage() {
    setTimeout(() => {
    window.location.reload();
      
    }, 2000);
  }
  showSuccess(value) {
    this.toastr.success(value, 'Éxito', {
      
    });
  }
  showError() {
    this.toastr.warning('Tu publicación se ha registrado', 'Error', {
      
    });
  }

}
