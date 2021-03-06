import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumoApiService } from '../../Servicios/consumo-api.service';
import { StorageService } from '../../Servicios/storage.service';
import { NgForm } from '@angular/forms';
import { interfaceUsuario } from 'src/app/interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { toUnicode } from 'punycode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {


  //LOGIN
  
  
  public isLog = false;
  nombre = '';
  public isError = false;
  public isErrorLogin = false;
  public cargando:boolean
  public cargandoLogin:boolean
  
  //REGISTRO
  public isErrorRegistro = false;

  public isErrorEnviarEmail = false;

  
  credenciales = {
    correo: '',
    password: '',
  };
  public enviarCorreoUser:string=''
  
  public usuario:interfaceUsuario={
    nombres:'',
    apellidos:'',
    correo:'',
    password:'',
    img:'https://apistoragereciclamos.herokuapp.com/imgpublicaciones/userd.png'
    
  }
  constructor(
    private servicios: ConsumoApiService,
    private storage: StorageService,
    private toastr: ToastrService,


  ) {}

  ngOnInit() {}

  login(form: NgForm) {
    let correoLowercase=this.credenciales.correo.toLowerCase();
    let correoTrim=correoLowercase.replace(/ /g, "");
    
    this.cargandoLogin=true
    if (form.valid) {
      try {
        this.credenciales.correo=correoTrim
        this.servicios
          .post('login', this.credenciales)
          .subscribe((res: any) => {
            if (res.STATUS === 'SUCCESS' && res.DATA.lenght !== null) {
              this.storage.store(res.DATA);
              this.reloadPage();
            } else {
              this.cargandoLogin=false
              this.onisErrorLogin();
             
            }
          });
      } catch (error) {
        alert('ocurrio un error inesperado');
        console.log(error);
        this.cargandoLogin=false
      }
    } else {
      this.cargandoLogin=false
      this.onisError();
    }
  }
  

  registro(form: NgForm) {
    let correoLowercase=this.usuario.correo.toLowerCase();
    let correoTrim=correoLowercase.replace(/ /g, "");
    this.usuario.correo=correoTrim
    this.cargando=true
    if (form.valid) {
      try {
        this.servicios
          .post('users', this.usuario)
          .subscribe((res: any) => {
            if (res.STATUS === 'SUCCESS') {
              this.storage.store(res.DATA);
              this.showSuccess('Te has registrado en el sistema de manera correcta')
              this.cargando=false
              this.reloadPage();
            } else {
              this.showError(res.MESSAGE)
              this.cargando=false
             
              
            }
          });
      } catch (error) {
        alert('ocurrio un error inesperado');
        console.log(error);
        this.cargando=false

      }
    } else {
      this.onisErrorRegistro();
      this.cargando=false

    }
  }
  enviarCorreo(form:NgForm){
    this.cargando=true
    if (form.valid) {
      try {
        this.servicios
          .get('userSendCorreo/'+this.enviarCorreoUser)
          .subscribe((res: any) => {
            if (res.STATUS === 'SUCCESS') {
              this.showSuccess('Tu contraseña se ha enviado a tu correo registrado en la plataforma')
              this.cargando=false
            } else {
              this.showError(res.MESSAGE)
              this.cargando=false
            }
          });
      } catch (error) {
        alert('ocurrio un error inesperado');
        console.log(error);
        this.cargando=false
      }
    } else {
      this.cargando=false
      this.onisErrorEnviarCorreo();
    }
  }
  reloadPage() {
    window.location.reload();
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
  onisErrorRegistro(): void {
    this.isErrorRegistro = true;
    setTimeout(() => {
      this.isErrorRegistro = false;
    }, 4000);
  }
  onisErrorEnviarCorreo(): void {
    this.isErrorEnviarEmail = true;
    setTimeout(() => {
      this.isErrorEnviarEmail = false;
    }, 4000);
  }
  showSuccess(value) {
    this.toastr.success(value, 'Éxito', {
      
    });
  }
  showError(value){
    this.toastr.error(value, 'Error', {
    });
  }
  /*ingresar() {

    this.wsService.loginWS( this.nombre )
      .then( () => {

        this.router.navigateByUrl('/mensajes');

      });

  }*/
}
